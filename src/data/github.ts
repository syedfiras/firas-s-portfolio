export interface ContribDay {
  date: string;
  level: number;
  count: number;
}

/** Deterministic PRNG so the fallback snapshot never changes between renders. */
function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const levelFromCount = (count: number) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

/**
 * Static fallback: a fixed, deterministic 53×7 contribution grid ending today.
 * Used when the GitHub request fails so the section always renders.
 */
export function buildSnapshot(): ContribDay[] {
  const rand = mulberry32(20281019);
  const days: ContribDay[] = [];
  const today = new Date();

  // Walk back to the most recent Sunday + 52 whole weeks (371 cells).
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const total = 371;

  for (let i = total - 1; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const roll = rand();
    const active = roll > (weekend ? 0.55 : 0.38);
    const count = active ? Math.floor(rand() * (weekend ? 4 : 11)) + 1 : 0;
    days.push({
      date: d.toISOString().slice(0, 10),
      level: levelFromCount(count),
      count,
    });
  }
  return days;
}

export const GITHUB_CONTRIB_ENDPOINT = 'https://github.com/users/syedfiras/contributions';

/** Parse GitHub's contribution calendar HTML into typed days. */
export function parseContributions(html: string): ContribDay[] {
  /**
   * Per-day counts live in sibling <tool-tip for="<day-id>">N contributions…</tool-tip>
   * elements, not in aria-labels. Build a lookup keyed by the day cell id first.
   */
  const countById = new Map<string, number>();
  const tipRe = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>(\d+)\s+contribution/g;
  let tip: RegExpExecArray | null;
  while ((tip = tipRe.exec(html)) !== null) {
    countById.set(tip[1], Number.parseInt(tip[2], 10) || 0);
  }

  const days: ContribDay[] = [];
  const tagRe = /<td\b[^>]*>/g;
  const tags = html.match(tagRe) ?? [];
  for (const tag of tags) {
    const id = /\bid="([^"]+)"/.exec(tag)?.[1];
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)?.[1];
    const level = /data-level="(\d+)"/.exec(tag)?.[1];
    if (!date || level === undefined) continue;
    days.push({ date, level: Number(level), count: id ? (countById.get(id) ?? 0) : 0 });
  }

  // GitHub emits cells row-major (all Sundays, then Mondays…); the grid renders
  // column-major, so order the days chronologically before handing them off.
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

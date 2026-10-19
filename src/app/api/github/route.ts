import { NextResponse } from 'next/server';
import {
  buildSnapshot,
  parseContributions,
  GITHUB_CONTRIB_ENDPOINT,
} from '@/data/github';

export const revalidate = 86400; // refresh daily

export async function GET() {
  try {
    const res = await fetch(GITHUB_CONTRIB_ENDPOINT, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; syedfiras-portfolio/1.0)',
        Accept: 'text/html',
      },
      next: { revalidate },
    });

    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const html = await res.text();
    const days = parseContributions(html);
    if (days.length < 100) throw new Error('Unexpected contribution markup');

    return NextResponse.json(
      { days, source: 'github' as const },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' } },
    );
  } catch {
    return NextResponse.json(
      { days: buildSnapshot(), source: 'fallback' as const },
      { headers: { 'Cache-Control': 'public, s-maxage=3600' } },
    );
  }
}

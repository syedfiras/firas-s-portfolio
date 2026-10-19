'use client';

export const INTRO_EVENT = 'site:loaded';

/** Marks the intro/loader as finished and notifies any late subscribers. */
export function markIntroDone() {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.loaded = 'true';
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function isIntroDone() {
  return typeof document !== 'undefined' && document.documentElement.dataset.loaded === 'true';
}

/** Runs `cb` once the intro has finished (immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (isIntroDone()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}

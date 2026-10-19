'use client';

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Coarse pointer means touch — used to disable the custom cursor + heavy pinning. */
export function isTouch(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

/**
 * gsap.matchMedia conditions shared by every section.
 * `full`  → desktop, motion allowed, heavy pinning enabled.
 * `lite`  → mobile / tablet, simplified sequencing, no pinning.
 * `reduce`→ reduced motion, fade-only fallbacks.
 */
export const MEDIA = {
  full: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  lite: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
} as const;

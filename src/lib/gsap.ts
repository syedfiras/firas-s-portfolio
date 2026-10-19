'use client';

import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

/**
 * Registers GSAP plugins exactly once, on the client only.
 * Safe to import from multiple client components.
 */
export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Keep pinned/scrubbed timelines in sync with Lenis' virtual scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

// Register eagerly on the client so the very first section can use it.
registerGsap();

/**
 * Minimal replacement for @gsap/react's useGSAP.
 * Creates a gsap.context scoped to `scope`, runs `setup`, and reverts every
 * tween / ScrollTrigger created inside it on unmount.
 */
export function useGsap(
  setup: (context: gsap.Context) => void,
  options: { scope?: RefObject<HTMLElement | null>; dependencies?: DependencyList } = {},
) {
  const { scope, dependencies = [] } = options;
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(setup, scope?.current ?? undefined);
    ctxRef.current = ctx;
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ctxRef;
}

export { gsap, ScrollTrigger, SplitText };
export default gsap;

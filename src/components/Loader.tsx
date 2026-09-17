'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const DURATION = 1900;
const EXIT_DURATION = 650;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setProgress(100);
    setDone(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    completeTimerRef.current = window.setTimeout(onComplete, EXIT_DURATION);
  }, [onComplete]);

  useEffect(() => {
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = easeOutCubic(t);
      setProgress(eased * 100);
      if (t < 1 && !doneRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (t >= 1) {
        exitTimerRef.current = window.setTimeout(triggerExit, 80);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') triggerExit();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      window.removeEventListener('keydown', onKey);
    };
  }, [triggerExit]);

  const pct = Math.floor(progress);
  const pctDisplay = String(pct).padStart(2, '0');

  return (
    <div
      className={`loader ${done ? 'loader--hide' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader__top">
        <span className="loader__top-left">SYED FIRAS — PORTFOLIO 2026</span>
        <span className="loader__top-right">{pctDisplay} — LOADING</span>
      </div>

      <div className="loader__center">
        <div className="loader__eyebrow">SDE Intern @ Dream Space Interiors — Bangalore</div>

        <h1 className="loader__title" aria-hidden="true">
          <span className="loader__word loader__word--hollow" style={{ animationDelay: '0.08s' }}>
            SYED
          </span>
          <span className="loader__word loader__word--solid" style={{ animationDelay: '0.20s' }}>
            FIRAS
          </span>
          <span className="loader__word loader__word--hollow" style={{ animationDelay: '0.32s' }}>
            PEERZADA
          </span>
        </h1>
        <span className="sr-only">Syed Firas Peerzada</span>

        <div className="loader__sub">
          <span>Full Stack Developer</span>
          <span className="loader__sub-dot" aria-hidden="true">
            —
          </span>
          <span>Building digital products</span>
        </div>
      </div>

      <div className="loader__bottom">
        <span className="loader__bottom-left">EST. 2024 — BANGALORE, IN</span>
        <button type="button" className="loader__skip" onClick={triggerExit} aria-label="Skip loading animation">
          SKIP <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="loader__ghost" aria-hidden="true">
        {pctDisplay}
      </div>
    </div>
  );
}

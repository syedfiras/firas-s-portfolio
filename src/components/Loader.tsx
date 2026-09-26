'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

const NAME = 'SYED FIRAS'.split('');

const letter = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 + i * 0.04 },
  }),
};

type LoaderProps = {
  onDone?: () => void;
  /** Legacy alias used by AppLoader — behaves identically to onDone. */
  onComplete?: () => void;
};

export default function Loader({ onDone, onComplete }: LoaderProps) {
  const finish = onDone ?? onComplete ?? (() => {});
  useEffect(() => {
    // Honor reduced-motion: skip the intro quickly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = setTimeout(finish, 100);
      return () => clearTimeout(id);
    }
    const id = setTimeout(finish, 2000);
    return () => clearTimeout(id);
  }, [finish]);

  return (
    <motion.div
      className="loader"
      aria-hidden
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } }}
    >
      <div className="loader-inner">
        <motion.div
          className="loader-eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="loader-dot" />
          Full Stack Developer — Portfolio
        </motion.div>

        <h1 className="loader-name">
          <span className="loader-line">
            {NAME.map((ch, i) => (
              <span key={i} className="loader-mask">
                <motion.span
                  className={`loader-char${i >= 5 ? ' loader-char-dim' : ''}`}
                  initial="hidden"
                  animate="visible"
                  variants={letter}
                  custom={i}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="loader-track">
          <motion.div
            className="loader-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

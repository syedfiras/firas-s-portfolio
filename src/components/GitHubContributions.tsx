'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { GitHubCalendar, type Year } from 'react-github-calendar';
import { ArrowRight } from 'lucide-react';
import { Github } from './icons';
import { GITHUB_USERNAME } from '@/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

export default function ContributionsCard() {
  const [year, setYear] = useState<Year>('last');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const yearOptions = useMemo<{ label: string; value: Year }[]>(() => {
    if (!mounted) {
      // Stable server + first client render to avoid hydration mismatch.
      return [{ label: 'Last year', value: 'last' }];
    }
    const currentYear = new Date().getFullYear();
    return [
      { label: 'Last year', value: 'last' },
      { label: String(currentYear), value: currentYear },
      { label: String(currentYear - 1), value: currentYear - 1 },
    ];
  }, [mounted]);

  return (
    <motion.div
      className="card card-contrib card-p"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0.1}
    >
      <div className="contrib-head">
        <div>
          <div className="contrib-eyebrow">
            <Github size={13} /> @{GITHUB_USERNAME}
          </div>
          <h3 className="contrib-title">Days I ship.</h3>
          <p className="contrib-sub">
            Live from GitHub — every square is a day I pushed, merged, or built.
          </p>
        </div>
        <div className="contrib-years" role="tablist" aria-label="Contribution year">
          {yearOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              role="tab"
              aria-selected={year === opt.value}
              onClick={() => setYear(opt.value)}
              className={`contrib-year-btn${year === opt.value ? ' active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="contrib-scroll" suppressHydrationWarning>
        {mounted ? (
          <GitHubCalendar
            username={GITHUB_USERNAME}
            year={year}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            showWeekdayLabels
            theme={{
              dark: ['#18181e', 'rgba(34,197,94,0.18)', 'rgba(34,197,94,0.38)', 'rgba(34,197,94,0.65)', '#22c55e'],
            }}
            labels={{
              totalCount: '{{count}} contributions in {{year}}',
              legend: { less: 'Less', more: 'More' },
            }}
            errorMessage={`Couldn't load contributions for @${GITHUB_USERNAME} — check GitHub directly.`}
          />
        ) : (
          <div className="contrib-skeleton" aria-hidden />
        )}
      </div>

      <div className="contrib-foot">
        <span className="contrib-note">Public activity only · Updates daily from GitHub</span>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="github-link-pill"
        >
          <Github size={13} /> View on GitHub <ArrowRight size={12} />
        </a>
      </div>
    </motion.div>
  );
}

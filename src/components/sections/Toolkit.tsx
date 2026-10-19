'use client';

import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';
import { TOOLKIT_ROW_ONE, TOOLKIT_ROW_TWO } from '@/data/services';

export default function Toolkit() {
  return (
    <section id="toolkit" aria-label="Toolkit" className="relative overflow-hidden border-y border-line bg-void py-20 md:py-28">
      <div className="container-x mb-12 md:mb-16">
        <Reveal className="flex items-center gap-4">
          <span className="eyebrow">05 / Toolkit</span>
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow hidden sm:block">Tools I reach for</span>
        </Reveal>
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        <Marquee
          items={TOOLKIT_ROW_ONE}
          direction="left"
          duration={30}
          itemClassName="display text-ink text-6xl md:text-8xl"
        />
        <Marquee
          items={TOOLKIT_ROW_TWO}
          direction="right"
          duration={34}
          separator="/"
          itemClassName="display text-smoke text-5xl md:text-7xl"
        />
      </div>
    </section>
  );
}

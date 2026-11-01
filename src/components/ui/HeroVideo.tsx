'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Full-bleed hero background video. Muted, looping, and paused whenever the
 * hero leaves the viewport. Reduced-motion visitors keep the poster frame.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion()) {
      video.pause();
      return;
    }

    const play = () => {
      video.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(video);

    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/hero-bg.mp4"
        poster="/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-void/45" />
      <div className="hero-video-scrim absolute inset-0" />
    </div>
  );
}

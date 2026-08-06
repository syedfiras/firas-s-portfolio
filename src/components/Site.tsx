'use client';

import { useCallback, useEffect, useState } from 'react';
import Nav from './Nav';
import Hero from './Hero';
import Ticker from './Ticker';
import Work from './Work';
import Identity from './Identity';
import Contact from './Contact';
import Footer from './Footer';
import GrainOverlay from './GrainOverlay';
import Loader from './Loader';

type Theme = 'light' | 'dark';

export default function Site() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState<number[]>([0, 1, 6]);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisible((prev) => (prev.includes(index) ? prev : [...prev, index]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const s = useCallback(
    (index: number): string => (visible.includes(index) ? 'visible' : 'hidden'),
    [visible]
  );

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <GrainOverlay />
      <Nav s={s} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero s={s} />
        <Ticker s={s} />
        <Work s={s} />
        <Identity s={s} />
        <Contact s={s} />
      </main>
      <Footer s={s} />
    </>
  );
}
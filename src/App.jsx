import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Work from './components/Work';
import Identity from './components/Identity';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import Loader from './components/Loader';
import './index.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState([0, 1, 6]);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
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

  const s = (index) => (visible.includes(index) ? 'visible' : 'hidden');

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
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

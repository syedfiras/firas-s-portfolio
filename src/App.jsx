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
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (!loading) {
      const delays = [0, 60, 130, 200, 280, 360, 440, 520, 600];
      delays.forEach((delay, i) => {
        setTimeout(() => {
          setVisible((prev) => [...prev, i]);
        }, delay);
      });
    }
  }, [loading]);

  const s = (index) => (visible.includes(index) ? 'visible' : 'hidden');

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <GrainOverlay />
      <Nav s={s} />
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

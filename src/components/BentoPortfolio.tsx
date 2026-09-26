'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, MapPin, Clock, Mail } from 'lucide-react';
import { Github, Linkedin } from './icons';
import Image from 'next/image';

export default function BentoPortfolio() {
  const container = useRef(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  // Use a local time formatted string
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      
      {/* Navbar */}
      <nav className="nav">
        <div className="container nav-content">
          <div className="nav-brand">SYED FIRAS</div>
          <div className="nav-links">
            <a href="#work" className="nav-link">WORK</a>
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#contact" className="nav-link">CONTACT</a>
            <a href="#" className="nav-link flex items-center gap-2">RESUME <ArrowRight size={14} /></a>
          </div>
        </div>
      </nav>

      <main className="container" ref={container}>
        <div className="bento-grid">
          
          {/* HERO CARD - Large 2x2 or 3x2 on desktop depending on layout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card col-span-2 row-span-2 hero-card"
          >
            <div className="card-content justify-between">
              <div>
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem', textTransform: 'uppercase' }}>
                  Syed Firas<br />Peerzada
                </h1>
                <p className="bento-subtitle" style={{ fontSize: '1.25rem', letterSpacing: '0.05em' }}>FULL STACK DEVELOPER</p>
              </div>
              
              <div>
                <div style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  BUILD<br />CREATE<br />IMPACT
                </div>
                <div className="flex gap-4 mt-8">
                  <a href="#work" className="btn-primary">VIEW WORK <ArrowRight size={16} className="ml-2" /></a>
                  <a href="#contact" className="btn-primary" style={{ background: 'var(--border-color)', color: 'var(--text-primary)' }}>START A PROJECT</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PROFILE / PHOTO CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bento-card col-span-1 row-span-2 p-0"
            style={{ padding: 0 }}
          >
            {/* We will use a placeholder or the actual image if available */}
            <div className="card-image-bg" style={{ opacity: 0.8, backgroundImage: 'url(/og.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
            <div className="card-content card-bottom p-6 z-10 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-end w-full">
                <div className="badge"><span className="status-dot"></span> ONLINE</div>
                <div className="text-right">
                  <div className="text-sm font-semibold flex items-center justify-end gap-1"><MapPin size={12}/> KARNATAKA, INDIA</div>
                  <div className="text-xs text-secondary mt-1 flex items-center justify-end gap-1"><Clock size={12}/> {time} LOCAL TIME</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* STATS CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content justify-center">
              <div className="mb-4">
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>03+</div>
                <div className="text-xs text-secondary mt-1 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>20+</div>
                <div className="text-xs text-secondary mt-1 uppercase tracking-wider">Apps & Web Apps</div>
              </div>
            </div>
          </motion.div>

          {/* ABOUT / IDENTITY CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content">
              <h3 className="text-lg font-bold mb-2">I BUILD THINGS THAT WORK.</h3>
              <p className="text-xs text-secondary mb-4 leading-relaxed">
                NO DECORATION FOR DECORATION'S SAKE.
              </p>
              <p className="text-sm text-secondary leading-relaxed mt-auto">
                Every pixel is intentional. Every component earns its place. I ship products people actually use.
              </p>
            </div>
          </motion.div>

          {/* FEATURED PROJECT: BIFA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-2 row-span-2 project-card"
          >
            <div className="card-content">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-secondary mb-2 tracking-widest">PROJECT 01 — MOBILE & WEB</div>
                  <h3 className="bento-title text-3xl">BIFA FOOTBALL CLUB MANAGER</h3>
                </div>
                <ArrowRight className="text-secondary" />
              </div>
              
              <div className="mt-auto">
                <p className="text-sm text-secondary mb-4 max-w-md">
                  A comprehensive team management system for BIFA Football Club, streamlining player tracking, match scheduling, and club administration.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">React Native</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">NativeWind</span>
                  <span className="tech-tag">Supabase</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* EXPERIENCE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-2 row-span-1"
          >
            <div className="card-content">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">DREAM SPACE INTERIORS</h3>
                  <div className="text-sm text-secondary mt-1">SDE INTERN — Bangalore</div>
                </div>
                <div className="text-sm text-secondary bg-white/5 px-3 py-1 rounded-full">Jul 2026 — Present</div>
              </div>
              <p className="text-sm text-secondary mt-auto">
                Building Interiora Studio, a production-ready interior design management platform with authentication, project management, and internal tooling.
              </p>
            </div>
          </motion.div>

          {/* TOOLKIT MARQUEE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-2 row-span-1 p-0 justify-center overflow-hidden"
          >
             <div className="marquee-container w-full h-full">
                <div className="marquee-content">
                  <span className="marquee-item active">REACT</span>
                  <span className="marquee-item">REACT NATIVE</span>
                  <span className="marquee-item active">NEXT.JS</span>
                  <span className="marquee-item">TYPESCRIPT</span>
                  <span className="marquee-item active">NODE.JS</span>
                  <span className="marquee-item">SUPABASE</span>
                  <span className="marquee-item active">PYTHON</span>
                  <span className="marquee-item">MONGODB</span>
                  {/* Repeat for seamless effect */}
                  <span className="marquee-item active">REACT</span>
                  <span className="marquee-item">REACT NATIVE</span>
                  <span className="marquee-item active">NEXT.JS</span>
                  <span className="marquee-item">TYPESCRIPT</span>
                  <span className="marquee-item active">NODE.JS</span>
                  <span className="marquee-item">SUPABASE</span>
                  <span className="marquee-item active">PYTHON</span>
                  <span className="marquee-item">MONGODB</span>
                </div>
             </div>
          </motion.div>

          {/* PROJECT 03: GYMNET */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-2 row-span-1 project-card"
          >
            <div className="card-content">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-secondary mb-1 tracking-widest">PROJECT 02 — MOBILE & WEB</div>
                  <h3 className="bento-title text-xl">GYMNET SOLUTIONS</h3>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-xs text-secondary mb-3">
                  A gym management platform for member tracking, work scheduling, automated billing, and monthly performance logs.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">Ionic Angular</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Supabase</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PROJECT 05: FOOTBALLCOACH AI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-2 row-span-1 project-card"
          >
            <div className="card-content">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-secondary mb-1 tracking-widest">PROJECT 03 — AI PLATFORM</div>
                  <h3 className="bento-title text-xl">FOOTBALLCOACH AI</h3>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-xs text-secondary mb-3">
                  AI-powered football coaching assistant — tactical analysis, drill generation, and performance insights.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Supabase</span>
                  <span className="tech-tag">OpenRouter</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PROJECT 04: IJESTM */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-1 row-span-2 project-card"
          >
            <div className="card-content">
              <div className="text-xs text-secondary mb-2 tracking-widest">PROJECT 04</div>
              <h3 className="bento-title text-xl mb-4">IJESTM JOURNAL PLATFORM</h3>
              <p className="text-xs text-secondary mb-4">
                A college journal website for AITM with advanced SEO features tailored for academic publications and research papers.
              </p>
              <div className="mt-auto tech-stack">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">TypeScript</span>
              </div>
            </div>
          </motion.div>

          {/* EXTRACURRICULAR CARDS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content card-center">
              <h4 className="font-bold text-center mb-2">AIFF REFEREE</h4>
              <p className="text-xs text-center text-secondary">Certified by AIFF. Sharp decision-making & composure under pressure.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content card-center">
              <h4 className="font-bold text-center mb-2">4× STATE FOOTBALL</h4>
              <p className="text-xs text-center text-secondary">Represented at the state level across four tournaments.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content card-center">
              <h4 className="font-bold text-center mb-2">6+ HACKATHONS</h4>
              <p className="text-xs text-center text-secondary">Building end-to-end prototypes under tight deadlines.</p>
            </div>
          </motion.div>

          {/* GITHUB ACTIVITY */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-1 row-span-1"
          >
            <div className="card-content card-center">
              <Github size={32} className="mb-4" />
              <a href="https://github.com/syedfiras" target="_blank" rel="noreferrer" className="text-sm font-bold flex items-center gap-2 hover:text-white transition-colors text-secondary">
                VIEW MY ACTIVITY <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* CONTACT CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card col-span-4 row-span-1"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
          >
            <div className="card-content flex flex-row items-center justify-between px-8">
              <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                LET'S MAKE<br />SOMETHING GOOD.
              </div>
              <div className="flex flex-col items-end gap-6">
                <a href="mailto:workwithfiras@gmail.com" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
                  Let's Talk <ArrowRight size={24} />
                </a>
                <div className="flex gap-4">
                  <a href="https://github.com/syedfiras" className="p-3 border border-black/20 rounded-full hover:bg-black/5 transition-colors"><Github size={20} /></a>
                  <a href="https://linkedin.com/in/syedfiras7" className="p-3 border border-black/20 rounded-full hover:bg-black/5 transition-colors"><Linkedin size={20} /></a>
                  <a href="mailto:workwithfiras@gmail.com" className="p-3 border border-black/20 rounded-full hover:bg-black/5 transition-colors"><Mail size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}

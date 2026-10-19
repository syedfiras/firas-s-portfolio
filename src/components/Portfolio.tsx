'use client';

import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import ProgressBar from '@/components/ui/ProgressBar';
import Hero from '@/components/sections/Hero';
import Identity from '@/components/sections/Identity';
import Services from '@/components/sections/Services';
import Experience from '@/components/sections/Experience';
import Toolkit from '@/components/sections/Toolkit';
import SelectedWork from '@/components/sections/SelectedWork';
import Certs from '@/components/sections/Certs';
import Beyond from '@/components/sections/Beyond';
import GithubActivity from '@/components/sections/GithubActivity';
import Contact from '@/components/sections/Contact';

export default function Portfolio() {
  return (
    <>
      <Loader />
      <Nav />
      <ProgressBar />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[120] -translate-y-24 border border-accent bg-void px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Identity />
        <Services />
        <Experience />
        <Toolkit />
        <SelectedWork />
        <Certs />
        <Beyond />
        <GithubActivity />
      </main>
      <Contact />
    </>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import Loader from './Loader';

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const type = nav?.type;
    const isReload = type === 'reload';
    const isBackForward = type === 'back_forward';
    const seen = sessionStorage.getItem('portfolio_loader_seen');

    // Show loader on first visit or hard reload, skip on back/forward and client navigations
    const shouldShow = isReload || !seen;
    // Explicitly skip if back_forward navigation
    if (isBackForward) {
      setLoading(false);
      setReady(true);
      return;
    }

    if (shouldShow) {
      setLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      setLoading(false);
    }
    setReady(true);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('portfolio_loader_seen', '1');
    setLoading(false);
    document.body.style.overflow = '';
  }, []);

  if (!ready) {
    // Avoid flash: render children hidden until check
    return <>{children}</>;
  }

  return (
    <>
      {loading && <Loader onComplete={handleComplete} />}
      {children}
    </>
  );
}

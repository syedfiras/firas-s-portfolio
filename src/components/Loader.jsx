import React, { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION = 2000;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
    }, 16);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDone(true);
      setTimeout(onComplete, 400);
    }, DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`loader ${done ? "loader--hide" : ""}`}>
      <div className="loader__inner">
        <div className="loader__name">Syed Firas Peerzada</div>
        <div className="loader__bar-wrap">
          <div className="loader__bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

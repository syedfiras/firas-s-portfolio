import React, { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Wait a moment at 100% before sliding out
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loader ${progress >= 100 ? 'loader--hide' : ''}`}>
      <div className="loader__content">
        <div className="loader__text">SYS.BOOT // {Math.min(progress, 100)}%</div>
        <div className="loader__bar">
          <div className="loader__bar-inner" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}

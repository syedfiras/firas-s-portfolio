import React, { useState, useEffect } from 'react';

const BOOT_MESSAGES = [
  'Initializing kernel modules...',
  'Loading system configuration...',
  'Mounting component tree...',
  'Establishing secure connection...',
  'Compiling interface layers...',
  'Calibrating rendering pipeline...',
  'Optimizing asset delivery...',
  'Ready to deploy.',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const DURATION = 4000;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const target = Math.min((elapsed / DURATION) * 100, 99.5);
      setProgress(p => {
        const next = Math.min(p + Math.floor(Math.random() * 6) + 2, target);
        return Math.min(next, 99.5);
      });
    }, 60);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(onComplete, 400);
    }, DURATION);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 13), BOOT_MESSAGES.length - 1);
    setMsgIndex(idx);
  }, [progress]);

  return (
    <div className={`loader ${progress >= 100 ? 'loader--hide' : ''}`}>
      <div className="loader__terminal">
        <div className="loader__terminal-bar">
          <span className="loader__terminal-dot" />
          <span className="loader__terminal-dot" />
          <span className="loader__terminal-dot" />
        </div>

        <div className="loader__name">SYED FIRAS</div>
        <div className="loader__tagline">App Developer &amp; Frontend Engineer</div>

        <div className="loader__divider" />

        <div className="loader__boot-msg">
          <span className="loader__prompt">&gt;</span>
          <span className="loader__msg-text">{BOOT_MESSAGES[msgIndex]}</span>
          <span className="loader__cursor" />
        </div>

        <div className="loader__progress-wrap">
          <div className="loader__progress-label">
            <span>{String(Math.min(progress, 100)).padStart(3, ' ')}%</span>
            <span>SYS.BOOT</span>
          </div>
          <div className="loader__progress-track">
            <div className="loader__progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

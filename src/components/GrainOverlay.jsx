import React from 'react';

export default function GrainOverlay() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div className="grain" />
    </>
  );
}

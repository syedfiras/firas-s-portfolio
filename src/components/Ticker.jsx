import React from 'react';
import { TICKER_ITEMS } from '../data';

export default function Ticker({ s }) {
  const tickerContent = TICKER_ITEMS.map((item, i) => (
    <span key={i}>
      <span className="ticker__item">{item}</span>
      <span className="ticker__sep">//</span>
    </span>
  ));

  return (
    <div className={`ticker ${s(2)}`} aria-hidden="true">
      <div className="ticker__track">
        <div className="ticker__group">{tickerContent}</div>
        <div className="ticker__group">{tickerContent}</div>
      </div>
    </div>
  );
}

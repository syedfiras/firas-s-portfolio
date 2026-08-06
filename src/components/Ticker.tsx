import { TICKER_ITEMS } from '@/data';

interface TickerProps {
  s: (index: number) => string;
}

export default function Ticker({ s }: TickerProps) {
  const tickerContent = TICKER_ITEMS.map((item, i) => (
    <span key={i}>
      <span className="ticker__item">{item}</span>
      <span className="ticker__sep">//</span>
    </span>
  ));

  return (
    <div className={`ticker ${s(2)}`} aria-hidden="true" data-index={2}>
      <div className="ticker__track">
        <div className="ticker__group">{tickerContent}</div>
        <div className="ticker__group">{tickerContent}</div>
      </div>
    </div>
  );
}
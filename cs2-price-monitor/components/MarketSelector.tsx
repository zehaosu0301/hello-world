'use client';

import { ChangeEvent } from 'react';
import { useMarkets } from '@/hooks/useMarkets';

interface Props {
  size?: 'sm' | 'md';
}

const allMarkets = ['buff', 'steam', 'skinport', 'csfloat'];

export default function MarketSelector({ size = 'md' }: Props) {
  const { markets, setMarkets } = useMarkets();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
    setMarkets(selected);
  };

  return (
    <select
      multiple
      aria-label="Select markets"
      value={markets}
      onChange={handleChange}
      className={`rounded-xl bg-slate-900 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand ${
        size === 'sm' ? 'h-10 px-2 py-1' : 'h-12 px-3 py-2'
      }`}
    >
      {allMarkets.map((market) => (
        <option key={market} value={market}>
          {market.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

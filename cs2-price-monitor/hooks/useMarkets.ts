'use client';

import { useMemo } from 'react';
import { create } from 'zustand';

interface MarketState {
  markets: string[];
  setMarkets: (markets: string[]) => void;
}

const defaultMarkets = process.env.NEXT_PUBLIC_DEFAULT_MARKETS?.split(',') ?? ['buff', 'steam'];

const useMarketStore = create<MarketState>((set) => ({
  markets: defaultMarkets,
  setMarkets: (markets) => set({ markets })
}));

export function useMarkets() {
  const markets = useMarketStore((state) => state.markets);
  const setMarkets = useMarketStore((state) => state.setMarkets);

  return useMemo(
    () => ({ markets, setMarkets }),
    [markets, setMarkets]
  );
}

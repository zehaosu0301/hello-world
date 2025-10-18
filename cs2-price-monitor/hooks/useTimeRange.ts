'use client';

import { useMemo } from 'react';
import { create } from 'zustand';

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface TimeRangeState {
  range: TimeRange;
  setRange: (range: TimeRange) => void;
}

const useTimeRangeStore = create<TimeRangeState>((set) => ({
  range: '7d',
  setRange: (range) => set({ range })
}));

export function useTimeRange() {
  const range = useTimeRangeStore((state) => state.range);
  const setRange = useTimeRangeStore((state) => state.setRange);

  return useMemo(
    () => ({ range, setRange }),
    [range, setRange]
  );
}

'use client';

import { useTimeRange } from '@/hooks/useTimeRange';

const ranges: Array<{ label: string; value: '24h' | '7d' | '30d' | '90d' }> = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' }
];

export default function TimeRangePicker() {
  const { range, setRange } = useTimeRange();

  return (
    <div role="group" aria-label="Select time range" className="flex rounded-xl bg-slate-900 p-1">
      {ranges.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`rounded-lg px-3 py-1 text-sm transition focus:outline-none focus:ring-2 focus:ring-brand ${
            range === option.value ? 'bg-brand text-white' : 'text-slate-300 hover:text-white'
          }`}
          onClick={() => setRange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

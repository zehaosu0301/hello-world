'use client';

import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface Props {
  label: string;
  value?: number;
  trend?: number;
}

export default function PriceBadge({ label, value, trend }: Props) {
  const formattedValue = Number.isFinite(value) ? `$${value?.toFixed(2)}` : '--';
  const trendValue = Number.isFinite(trend) ? `${(trend! * 100).toFixed(2)}%` : null;
  const isPositive = (trend ?? 0) >= 0;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-left">
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
        <span className="text-2xl font-semibold text-white">{formattedValue}</span>
      </div>
      {trendValue && (
        <span
          className={`flex items-center gap-1 rounded-xl px-2 py-1 text-sm font-medium ${
            isPositive ? 'bg-up/20 text-up' : 'bg-down/20 text-down'
          }`}
        >
          {isPositive ? <ArrowUpRightIcon className="h-4 w-4" aria-hidden /> : <ArrowDownRightIcon className="h-4 w-4" aria-hidden />}
          {trendValue}
        </span>
      )}
    </div>
  );
}

'use client';

import { ComponentPropsWithoutRef, useMemo } from 'react';

interface Props {
  label: string;
  value?: number;
  trend?: number;
}

function TrendArrow({ direction, ...rest }: { direction: 'up' | 'down' } & ComponentPropsWithoutRef<'svg'>) {
  const transform = direction === 'up' ? 'rotate(45)' : 'rotate(-45)';
  const viewBox = '0 0 24 24';
  return (
    <svg
      aria-hidden
      focusable="false"
      role="img"
      viewBox={viewBox}
      width={16}
      height={16}
      {...rest}
      className={`h-4 w-4 ${rest.className ?? ''}`.trim()}
    >
      <path
        d="M5 5h6v2H8.41l10.3 10.3-1.42 1.42L7 8.41V11H5z"
        transform={transform}
        fill="currentColor"
      />
    </svg>
  );
}

export default function PriceBadge({ label, value, trend }: Props) {
  const formattedValue = Number.isFinite(value) ? `$${value?.toFixed(2)}` : '--';
  const trendValue = useMemo(() => {
    if (!Number.isFinite(trend)) return null;
    return `${(trend! * 100).toFixed(2)}%`;
  }, [trend]);

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
          <TrendArrow direction={isPositive ? 'up' : 'down'} />
          {trendValue}
        </span>
      )}
    </div>
  );
}

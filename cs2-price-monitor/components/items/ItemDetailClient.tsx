'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { fetchPrices } from '@/lib/items';
import { getTimeWindow } from '@/lib/time';
import { useMarkets } from '@/hooks/useMarkets';
import { useTimeRange } from '@/hooks/useTimeRange';
import PriceBadge from '@/components/PriceBadge';
import TimeRangePicker from '@/components/TimeRangePicker';
import MarketSelector from '@/components/MarketSelector';
import type { Item, Series } from '@/types';

const PriceTrend = dynamic(() => import('@/components/PriceTrend'), { ssr: false, loading: () => <div className="h-80 w-full animate-pulse rounded-2xl bg-card" /> });

interface Props {
  item: Item;
}

export default function ItemDetailClient({ item }: Props) {
  const { markets } = useMarkets();
  const { range } = useTimeRange();
  const window = useMemo(() => getTimeWindow(range), [range]);
  const marketsParam = useMemo(() => markets.join(','), [markets]);

  const { data, isLoading, isError, refetch } = useQuery<Series[]>({
    queryKey: queryKeys.prices(item.id, window.from, window.to, marketsParam),
    queryFn: () => fetchPrices(item.id, window.from, window.to, marketsParam),
    enabled: Boolean(item.id),
    staleTime: 60_000,
    select: (response) => response.series
  });

  const allPoints = data?.flatMap((series) => series.points) ?? [];
  const latestPoint = allPoints.sort((a, b) => (a.ts > b.ts ? -1 : 1))[0];
  const badgeValue = latestPoint?.price_net_usd ?? latestPoint?.price_usd;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 rounded-2xl bg-card p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{item.market_hash_name}</h1>
          {item.rarity && <p className="text-sm text-slate-400">{item.rarity}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <TimeRangePicker />
          <MarketSelector />
        </div>
      </header>
      <PriceBadge label="Current Net" value={badgeValue} trend={undefined} />
      <section className="rounded-2xl bg-card p-6">
        {isLoading && <div className="h-80 animate-pulse rounded-2xl bg-slate-800" aria-hidden />}
        {isError && (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-red-400">Failed to load price history.</p>
            <button className="rounded-xl bg-brand px-3 py-2 text-sm" type="button" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <div className="rounded-2xl bg-slate-900 p-6 text-center text-sm text-slate-300">
            No price data available. Add this item to your watchlist or configure alerts to receive updates.
          </div>
        )}
        {!isLoading && !isError && data && data.length > 0 && <PriceTrend data={data as Series[]} />}
      </section>
    </div>
  );
}

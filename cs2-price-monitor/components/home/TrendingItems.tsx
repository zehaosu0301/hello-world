'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNow } from '@/lib/items';
import { queryKeys } from '@/lib/queryKeys';
import ItemCard from '@/components/items/ItemCard';
import type { NowRow } from '@/types';

interface Props {
  markets: string[];
  range: string;
}

export function TrendingItems({ markets, range }: Props) {
  const marketsParam = useMemo(() => markets.join(','), [markets]);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.now(marketsParam, range),
    queryFn: () => fetchNow(marketsParam),
    staleTime: 30_000
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-44 animate-pulse rounded-2xl bg-slate-800" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-900 p-6 text-center">
        <p className="text-sm text-red-400">Failed to load trending items.</p>
        <button className="rounded-xl bg-brand px-3 py-2 text-sm" type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const rows = data?.rows ?? [];
  if (!rows.length) {
    return (
      <div className="rounded-2xl bg-slate-900 p-6 text-center text-sm text-slate-300">
        No trending items yet. Add items to your watchlist to populate this section.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((row: NowRow) => (
        <ItemCard key={`${row.item_id}-${row.market}`} row={row} />
      ))}
    </div>
  );
}

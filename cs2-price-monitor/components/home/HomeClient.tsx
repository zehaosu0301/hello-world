'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MarketSelector from '@/components/MarketSelector';
import TimeRangePicker from '@/components/TimeRangePicker';
import PriceBadge from '@/components/PriceBadge';
import { useMarkets } from '@/hooks/useMarkets';
import { useTimeRange } from '@/hooks/useTimeRange';
import { TrendingItems } from '@/components/home/TrendingItems';

const PriceTrend = dynamic(() => import('@/components/PriceTrend'), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse rounded-2xl bg-card" />
});

export default function HomeClient() {
  const { markets } = useMarkets();
  const { range } = useTimeRange();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8">
        <section className="flex flex-col gap-4 rounded-2xl bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Trending Items</h1>
            <div className="flex flex-wrap items-center gap-3">
              <TimeRangePicker />
              <MarketSelector />
            </div>
          </div>
          <Suspense fallback={<div className="grid gap-4 md:grid-cols-2"><div className="h-80 animate-pulse rounded-2xl bg-slate-700" /></div>}>
            <TrendingItems markets={markets} range={range} />
          </Suspense>
        </section>
        <section className="grid gap-6 rounded-2xl bg-card p-6 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Latest Spread Opportunities</h2>
            <p className="text-sm text-slate-300">Monitor cross-market spreads to spot arbitrage chances.</p>
            <PriceBadge label="Example Item" value={123.45} trend={0.03} />
          </div>
          <PriceTrend data={[]} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

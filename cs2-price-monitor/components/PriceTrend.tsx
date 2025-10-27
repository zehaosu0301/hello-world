'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { Series } from '@/types';

interface Props {
  data: Series[];
}

export default function PriceTrend({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const option = {
      tooltip: { trigger: 'axis' },
      legend: { data: data.map((series) => series.market) },
      xAxis: { type: 'time' },
      yAxis: { type: 'value', name: 'USD' },
      series: data.map((series) => ({
        type: 'line',
        name: series.market,
        showSymbol: false,
        data: series.points.map((point) => [point.ts, point.price_net_usd ?? point.price_usd])
      }))
    };
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="h-80 w-full rounded-2xl bg-card" role="img" aria-label="Price trend chart" />;
}

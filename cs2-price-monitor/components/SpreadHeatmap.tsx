'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { SpreadRow } from '@/types';

export interface SpreadMatrixCell {
  from: string;
  to: string;
  value: number | null;
  items: SpreadRow[];
}

export interface SpreadMatrixResult {
  markets: string[];
  matrix: SpreadMatrixCell[][];
}

/**
 * Aggregate spreads to a symmetric matrix average.
 */
export function buildSpreadMatrix(spreads: SpreadRow[]): SpreadMatrixResult {
  const markets = Array.from(new Set(spreads.flatMap((row) => [row.from_market, row.to_market]))).sort();
  const marketIndex = new Map(markets.map((market, index) => [market, index] as const));
  const matrix = markets.map((from) =>
    markets.map((to) => ({ from, to, value: from === to ? 0 : null, items: [] as SpreadRow[] }))
  );

  for (const row of spreads) {
    const fromIdx = marketIndex.get(row.from_market);
    const toIdx = marketIndex.get(row.to_market);
    if (fromIdx === undefined || toIdx === undefined) continue;
    const cell = matrix[fromIdx][toIdx];
    cell.items.push(row);
  }

  for (const row of matrix.flat()) {
    if (!row.items.length || row.from === row.to) continue;
    const average = row.items.reduce((sum, item) => sum + item.spread_usd, 0) / row.items.length;
    row.value = Number(average.toFixed(2));
    row.items.sort((a, b) => Math.abs(b.spread_usd) - Math.abs(a.spread_usd));
  }

  return { markets, matrix };
}

interface Props {
  spreads: SpreadRow[];
}

export default function SpreadHeatmap({ spreads }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { markets, matrix } = buildSpreadMatrix(spreads);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const data = matrix
      .flatMap((row, i) =>
        row.map((cell, j) => [i, j, cell.value === null ? '-' : cell.value])
      );
    const option = {
      tooltip: {
        formatter: (params: any) => {
          const cell = matrix[params.data[0]][params.data[1]];
          if (!cell || !cell.items.length) {
            return `${cell?.from ?? ''} → ${cell?.to ?? ''}: No data`;
          }
          const topItems = cell.items.slice(0, 3);
          return `
            <div>
              <strong>${cell.from} → ${cell.to}</strong><br />
              Avg: ${cell.value}<br />
              ${topItems
                .map((item) => `${item.market_hash_name}: ${item.spread_usd.toFixed(2)} USD`)
                .join('<br />')}
            </div>
          `;
        }
      },
      xAxis: {
        type: 'category',
        data: markets,
        axisLabel: { color: '#cbd5f5' }
      },
      yAxis: {
        type: 'category',
        data: markets,
        axisLabel: { color: '#cbd5f5' }
      },
      visualMap: {
        min: -20,
        max: 20,
        calculable: true,
        inRange: {
          color: ['#dc2626', '#0EA5E9', '#16a34a']
        },
        textStyle: { color: '#cbd5f5' }
      },
      series: [
        {
          type: 'heatmap',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [markets, matrix]);

  if (!spreads.length) {
    return (
      <div className="rounded-2xl bg-slate-900 p-6 text-center text-sm text-slate-300">
        No spreads available yet. Try adjusting your market selection.
      </div>
    );
  }

  return <div ref={ref} className="h-96 w-full rounded-2xl bg-card" role="img" aria-label="Spread heatmap" />;
}

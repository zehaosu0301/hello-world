import { describe, expect, it } from 'vitest';
import { buildSpreadMatrix } from '@/components/SpreadHeatmap';
import type { SpreadRow } from '@/types';

const spreads: SpreadRow[] = [
  {
    item_id: 1,
    market_hash_name: 'AK-47',
    from_market: 'buff',
    to_market: 'steam',
    spread_usd: 10,
    spread_pct: 0.05
  },
  {
    item_id: 2,
    market_hash_name: 'M4A1',
    from_market: 'buff',
    to_market: 'steam',
    spread_usd: 6,
    spread_pct: 0.03
  },
  {
    item_id: 3,
    market_hash_name: 'AWP',
    from_market: 'steam',
    to_market: 'skinport',
    spread_usd: -4,
    spread_pct: -0.02
  }
];

describe('buildSpreadMatrix', () => {
  it('creates symmetric matrix with correct markets', () => {
    const { markets, matrix } = buildSpreadMatrix(spreads);
    expect(markets).toEqual(['buff', 'skinport', 'steam']);
    expect(matrix).toHaveLength(markets.length);
    expect(matrix[0]).toHaveLength(markets.length);
  });

  it('aggregates spreads by averaging values', () => {
    const { matrix, markets } = buildSpreadMatrix(spreads);
    const buffIndex = markets.indexOf('buff');
    const steamIndex = markets.indexOf('steam');
    expect(matrix[buffIndex][steamIndex].value).toBe(8);
  });

  it('fills missing markets with null', () => {
    const { matrix, markets } = buildSpreadMatrix(spreads);
    const buffIndex = markets.indexOf('buff');
    const skinportIndex = markets.indexOf('skinport');
    expect(matrix[buffIndex][skinportIndex].value).toBeNull();
  });

  it('sorts negative spreads by absolute value', () => {
    const rows: SpreadRow[] = [
      ...spreads,
      {
        item_id: 4,
        market_hash_name: 'Knife',
        from_market: 'steam',
        to_market: 'skinport',
        spread_usd: -8,
        spread_pct: -0.05
      }
    ];
    const { matrix, markets } = buildSpreadMatrix(rows);
    const steamIndex = markets.indexOf('steam');
    const skinportIndex = markets.indexOf('skinport');
    const cell = matrix[steamIndex][skinportIndex];
    expect(cell.items[0].spread_usd).toBe(-8);
  });
});

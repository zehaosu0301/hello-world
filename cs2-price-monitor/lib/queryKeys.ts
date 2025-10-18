export const queryKeys = {
  now: (markets: string, range?: string) => ['now', markets, range ?? ''] as const,
  item: (query: string) => ['item', query] as const,
  prices: (id: number, from: string, to: string, markets: string) => ['prices', id, from, to, markets] as const,
  spreads: (markets: string, window: string) => ['spreads', markets, window] as const,
  alerts: ['alerts'] as const
};

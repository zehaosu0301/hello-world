export function getTimeWindow(range: '24h' | '7d' | '30d' | '90d') {
  const now = new Date();
  const to = now.toISOString();
  const from = new Date(now);
  const map: Record<typeof range, number> = {
    '24h': 1,
    '7d': 7,
    '30d': 30,
    '90d': 90
  } as const;
  from.setDate(from.getDate() - map[range]);
  return { from: from.toISOString(), to };
}

export type MarketCode = 'steam' | 'buff' | 'skinport' | 'csfloat' | string;

export interface Item {
  id: number;
  app_id: number;
  market_hash_name: string;
  rarity?: string;
  exterior?: string;
  icon_url?: string;
}

export interface PricePoint {
  ts: string;
  price_raw?: number;
  currency?: string;
  price_usd: number;
  price_net_usd?: number;
  stock?: number;
  volume_24h?: number;
}

export interface Series {
  market: MarketCode;
  currency?: string;
  points: PricePoint[];
}

export interface SpreadRow {
  item_id: number;
  market_hash_name: string;
  from_market: MarketCode;
  to_market: MarketCode;
  spread_usd: number;
  spread_pct?: number;
}

export interface NowRow {
  item_id: number;
  market_hash_name: string;
  market: MarketCode;
  price_usd: number;
  price_net_usd?: number;
  change_24h?: number;
}

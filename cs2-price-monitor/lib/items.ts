import { api } from '@/lib/api';
import type { Item, NowRow, Series } from '@/types';

type SearchResponse = {
  items: Item[];
  page: number;
  total: number;
};

type PricesResponse = {
  series: Series[];
};

type NowResponse = {
  rows: NowRow[];
  asof: string;
};

export async function searchItems(query: string) {
  return api<SearchResponse>(`/v1/items?query=${encodeURIComponent(query)}&page=1&page_size=20`);
}

export async function fetchPrices(itemId: number, from: string, to: string, markets: string) {
  return api<PricesResponse>(`/v1/prices?item_id=${itemId}&from=${from}&to=${to}&markets=${markets}`);
}

export async function fetchNow(markets: string, limit = 20) {
  return api<NowResponse>(`/v1/now?markets=${markets}&limit=${limit}`);
}

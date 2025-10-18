import Image from 'next/image';
import Link from 'next/link';
import PriceBadge from '@/components/PriceBadge';
import type { NowRow } from '@/types';

interface Props {
  row: NowRow;
}

export default function ItemCard({ row }: Props) {
  return (
    <Link
      href={`/items/${encodeURIComponent(row.market_hash_name)}`}
      className="flex flex-col gap-3 rounded-2xl bg-slate-900 p-4 transition hover:ring-2 hover:ring-brand focus:outline-none focus:ring-2 focus:ring-brand"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-slate-800">
          <Image
            src={`https://steamcommunity-a.akamaihd.net/economy/image/${row.item_id}`}
            alt={row.market_hash_name}
            fill
            sizes="64px"
          />
        </div>
        <div>
          <p className="text-sm text-slate-300">{row.market_hash_name}</p>
          <p className="text-xs text-slate-500">{row.market.toUpperCase()}</p>
        </div>
      </div>
      <PriceBadge label="Net" value={row.price_net_usd ?? row.price_usd} trend={row.change_24h} />
    </Link>
  );
}

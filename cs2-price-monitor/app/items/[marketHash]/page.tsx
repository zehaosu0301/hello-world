import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ItemDetailClient from '@/components/items/ItemDetailClient';
import { searchItems } from '@/lib/items';
import { metadataConfig } from '@/lib/metadata';

interface PageProps {
  params: { marketHash: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  return {
    ...metadataConfig.item,
    title: `${decodeURIComponent(params.marketHash)} | CS2 Price Monitor`
  };
}

export default async function ItemPage({ params }: PageProps) {
  const query = decodeURIComponent(params.marketHash);
  const data = await searchItems(query);
  const item = data.items?.[0];

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8">
        <ItemDetailClient item={item} />
      </main>
      <Footer />
    </div>
  );
}

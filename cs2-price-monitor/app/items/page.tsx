import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const revalidate = 60;

export default function ItemsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8">
        <h1 className="text-2xl font-semibold">Items</h1>
        <p className="text-sm text-slate-300">Search and filter skins across supported marketplaces.</p>
      </main>
      <Footer />
    </div>
  );
}

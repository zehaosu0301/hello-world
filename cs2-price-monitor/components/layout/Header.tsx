import Link from 'next/link';
import { Suspense } from 'react';
import MarketSelector from '@/components/MarketSelector';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import AuthButton from '@/components/layout/AuthButton';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-card/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-brand">
          CS2 Price Monitor
        </Link>
        <Suspense fallback={<div className="h-10 w-32 animate-pulse rounded-xl bg-slate-700" />}>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              placeholder="Search items"
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <MarketSelector size="sm" />
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </Suspense>
      </div>
    </header>
  );
}

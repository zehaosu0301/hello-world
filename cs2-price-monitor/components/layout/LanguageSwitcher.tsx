'use client';

import { ChangeEvent } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const OPTIONS = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <select
      aria-label="Select language"
      className="h-10 rounded-xl bg-slate-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      defaultValue={locale}
      onChange={handleChange}
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

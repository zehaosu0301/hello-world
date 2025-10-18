import './globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { metadataConfig } from '@/lib/metadata';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = metadataConfig.root;

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = 'en';
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-bg text-white`}> 
        <NextIntlClientProvider locale={locale} messages={{}}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

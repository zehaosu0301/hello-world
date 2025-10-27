import './globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import { metadataConfig } from '@/lib/metadata';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = metadataConfig.root;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-bg text-white`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

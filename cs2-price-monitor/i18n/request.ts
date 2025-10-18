import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './config';

async function loadMessages(locale: (typeof locales)[number]) {
  switch (locale) {
    case 'zh':
      return (await import('./messages/zh.json')).default;
    case 'en':
    default:
      return (await import('./messages/en.json')).default;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = locales.includes(requestLocale as (typeof locales)[number])
    ? (requestLocale as (typeof locales)[number])
    : defaultLocale;

  try {
    const messages = await loadMessages(locale);
    return { locale, messages };
  } catch (error) {
    const fallbackMessages = await loadMessages(defaultLocale);
    return { locale: defaultLocale, messages: fallbackMessages };
  }
});

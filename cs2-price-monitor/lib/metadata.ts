import type { Metadata } from 'next';

const baseTitle = 'CS2 Price Monitor';
const baseDescription = 'Track CS2 skin prices across Steam, BUFF, Skinport and more.';

export const metadataConfig: { [key: string]: Metadata } = {
  root: {
    title: {
      default: baseTitle,
      template: `%s | ${baseTitle}`
    },
    description: baseDescription,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      type: 'website'
    }
  },
  home: {
    title: 'Live CS2 Skin Prices',
    description: 'Discover trending skins, monitor spreads and stay ahead of the CS2 market.'
  },
  item: {
    title: 'Item Details',
    description: 'Explore cross-market pricing for your favourite CS2 skins.'
  }
};

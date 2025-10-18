import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'steamcommunity-a.akamaihd.net' },
      { protocol: 'https', hostname: 'cdn.cloudflare.steamstatic.com' }
    ]
  }
};

export default withSentryConfig(nextConfig, {
  silent: true
});

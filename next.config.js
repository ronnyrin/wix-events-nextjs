/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/events/query',
        destination:
          'https://www.wixapis.com/events/v1/events/query',
      },
      {
        source: '/api/v1/tickets/available',
        destination:
          'https://www.wixapis.com/events/api/v1/tickets/available',
      },
      {
        source: '/v1/events/:id/tickets/reservation',
        destination:
            'https://www.wixapis.com/events/v1/events/:id/tickets/reservation'
      },
    ];
  },
  env: {},
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app', 'src'],
  },
  images: {
    domains: ['fakeimg.pl', 'static.wixstatic.com'],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;

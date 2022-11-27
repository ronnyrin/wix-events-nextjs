/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/availability/query',
        destination: 'https://www.wixapis.com/availability-calendar/v1/availability/query',
      },
      {
        source: '/api/v1/catalog/services',
        destination: 'https://www.wixapis.com/bookings/v1/catalog/services',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

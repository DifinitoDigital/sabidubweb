/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'hrytlltqpgvsonvkozoo.supabase.co',
      'i.pravatar.cc',
      'images.unsplash.com',
      'logo.clearbit.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hrytlltqpgvsonvkozoo.supabase.co',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/competition',
        destination: '/leaderboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

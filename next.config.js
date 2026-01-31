/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hrytlltqpgvsonvkozoo.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hrytlltqpgvsonvkozoo.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

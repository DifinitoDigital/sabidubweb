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
};

module.exports = nextConfig;

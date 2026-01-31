/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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

export default nextConfig;

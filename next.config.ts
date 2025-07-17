import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market/files/febc13-final01-emjf/**',
      },
    ],
  },
};

export default nextConfig;

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
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 업로드 용량 증가(1MB → 10MB)
    },
  },
};

export default nextConfig;

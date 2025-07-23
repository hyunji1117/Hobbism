import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 또는 '10mb', '20mb' 등으로 설정
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market/files/febc13-final01-emjf/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net', // ✅ 수정됨
        pathname: '/**', // ✅ 모든 경로 허용
      },
      {
        protocol: 'http',
        hostname: 't1.kakaocdn.net',
        pathname: '/**', // ✅ '**' 앞에 '/' 추가
      },
    ],
  },
};

export default nextConfig;

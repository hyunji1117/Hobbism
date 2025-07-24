'use server';

import { Product, ProductListRes } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function fetchLiveProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    headers: {
      'Client-Id': CLIENT_ID,
    },
    next: {
      tags: ['list'],
      revalidate: 10,
    },
    cache: 'force-cache',
  });

  const data: ProductListRes = await res.json();

  if (!data.ok || !Array.isArray(data.item)) {
    console.error('서버 응답 오류', data);
    return [];
  }

  return data.item;
}

'use server';

import { Product, ProductListRes } from '@/types/interface/product';

const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
export async function fetchProducts(page: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products?page=${page}&limit=10`, {
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

  // console.log('ProductsFetch', data.item.length);
  // console.log(data);

  if (!data.ok || !Array.isArray(data.item)) {
    console.error('서버 응답 오류', data);
    return [];
  }

  return data.item;
}

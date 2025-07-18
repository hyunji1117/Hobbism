'use server';

import { Product } from '@/types/interface/product';

const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    headers: {
      'Client-Id': CLIENT_ID,
    },
    next: {
      tags: ['list'],
      revalidate: 10,
    },
  });

  const data = await res.json();

  // console.log('ProductsFetch', data.item.length);
  // console.log(data);

  return data.item;
}

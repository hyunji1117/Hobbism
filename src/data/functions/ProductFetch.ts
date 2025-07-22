'use server';

import { Product } from '@/types/interface/product';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`https://fesp-api.koyeb.app/market/products`, {
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
    },
    // next: {
    //   tags: ['list'],
    //   revalidate: 10,
    // },
  });

  const data = await res.json();
  return data.item;
}

export async function fetchProductDetail(
  productId: string,
): Promise<{ item: Product }> {
  const res = await fetch(
    `https://fesp-api.koyeb.app/market/products/${productId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      // {
      //   ok: 1,
      //   item: { ...productData }
      // }
    },
  );
  const data = await res.json();
  console.log('Fetched product detail:', data);
  return data;
}

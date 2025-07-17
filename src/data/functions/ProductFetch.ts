'use server';

import { Product } from '@/types/interface/product';

export async function fetchProducts(): Promise<Product[]> {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

  const res = await fetch(`https://fesp-api.koyeb.app/market/products`, {
    headers: {
      'Client-Id': CLIENT_ID,
    },
    // next: {
    //   tags: ['list'],
    //   revalidate: 10,
    // },
  });

  const data = await res.json();

  // console.log('ProductsFetch', data.item.length);
  console.log(data);

  return data.item;
}

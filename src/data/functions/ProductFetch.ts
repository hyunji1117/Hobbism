'use server';

import { Product } from '@/types/interface/product';

export async function fetchProducts(): Promise<Product[]> {
  const CLIENT_ID = 'febc13-final01-emjf';

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

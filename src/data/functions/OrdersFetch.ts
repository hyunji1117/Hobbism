'use server';

import { OrderInfoRes } from '@/types/orders';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function fetchOrderDetail(
  accessToken: string,
  orderId: number,
): Promise<OrderInfoRes> {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();

  return data;
}

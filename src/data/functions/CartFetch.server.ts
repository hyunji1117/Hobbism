'use server';

import { DeleteCartsRes } from '@/types/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function deleteCartItem(
  id: number,
  formData: FormData,
): Promise<DeleteCartsRes> {
  const accessToken = formData.get('accessToken') as string;
  const res = await fetch(`${API_URL}/carts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const responseData = await res.json();
  console.log('서버 응답 데이터:', responseData);

  if (!res.ok) {
    console.error('삭제 실패:', res.status, res.statusText);
    throw new Error('삭제 실패');
  }
  return responseData;
}

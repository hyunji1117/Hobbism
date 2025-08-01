'use server';

import { ApiRes, ApiResPromise } from '@/types';
import { OrderProductType } from '@/types/orders';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function createOrder(
  state: ApiRes<OrderProductType> | null,
  formData: FormData,
): ApiResPromise<OrderProductType> {
  const raw = formData.get('products') as string;
  const products = JSON.parse(raw);
  const accessToken = formData.get('accessToken') as string;

  console.log('🛒 주문 데이터:', products);
  console.log('🔑 토큰:', accessToken);

  let res: Response;
  let data: ApiRes<OrderProductType>;

  const body = {
    products: products,
  };

  try {
    res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    console.log('✅ 주문 생성 응답:', data);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  return data;
}

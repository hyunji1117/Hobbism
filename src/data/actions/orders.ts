import { ApiRes, ApiResPromise } from '@/types';
import { OrderProductType } from '@/types/orders';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function createOrder(
  state: ApiRes<OrderProductType> | null,
  formData: FormData,
): ApiResPromise<OrderProductType> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ApiRes<OrderProductType>;

  try {
    res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  return data;
}

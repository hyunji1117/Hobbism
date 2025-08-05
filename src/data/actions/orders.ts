'use server';

import { ApiRes, ApiResPromise } from '@/types';
import { OrderProductType } from '@/types/orders';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function createOrder(
  state: ApiRes<OrderProductType> | null,
  formData: FormData,
): ApiResPromise<OrderProductType> {
  const raw = formData.get('products') as string;
  const products = JSON.parse(raw);
  const accessToken = formData.get('accessToken') as string;
  const selectedPayment = formData.get('selectedPayment') as string;

  let res: Response;
  let data: ApiRes<OrderProductType>;

  const body = {
    products: products,
    selectedPayment: selectedPayment,
    address: {
      address: formData.get('address'),
      detailAddress: formData.get('detail'),
      postcode: formData.get('postcode'),
    },
    user: {
      name: formData.get('name'),
      phone: formData.get('phone'),
    },
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
    console.log('주문 생성 응답:', data);
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  if (data.ok) {
    const orderId = data.item._id;

    revalidatePath(`/shop/orderCompleted/${orderId}`);
    redirect(`/shop/orderCompleted/${orderId}`);
  } else {
    return data;
  }
}

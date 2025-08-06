'use server';

import { getUserAttribute, updateUserInfo } from '@/data/actions/user';
import { deleteCartItem } from '@/data/functions/CartFetch.server';
import { ApiRes, ApiResPromise } from '@/types';
import { CartItem } from '@/types/cart';
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

  const cartIds = products
    .map((item: CartItem) => item.cartId)
    .filter((id): id is number => typeof id === 'number');

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

    if (cartIds.length > 0) {
      await Promise.all(
        cartIds.map((id: number) => deleteCartItem(id, formData)),
      );
    }
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 주문에 실패했습니다.' };
  }

  if (data.ok) {
    const order = data.item;
    const orderId = data.item._id;
    const userId = order.user_id;
    const totalAmount = order.cost.total;

    const point = Math.floor(totalAmount / 100 / 10) * 10;

    const extraRes = await getUserAttribute(userId, 'extra');
    const prevTotalPoint =
      extraRes.ok === 1 && extraRes.item.extra.total_point
        ? extraRes.item.extra.total_point
        : 0;

    const prevPoint =
      extraRes.ok === 1 && extraRes.item.extra.point
        ? extraRes.item.extra.point
        : 0;

    const updatedTotalPoint = prevTotalPoint + point;
    const updatedPoint = prevPoint + point;

    const userUpdateFormData = new FormData();
    userUpdateFormData.set('accessToken', accessToken);
    userUpdateFormData.set('point', String(updatedPoint));
    userUpdateFormData.set('total_point', String(updatedTotalPoint));

    const updateRes = await updateUserInfo(userId, userUpdateFormData);
    if (updateRes.ok !== 1) {
      console.warn('유저 정보 업데이트 실패:', updateRes.message);
    }

    revalidatePath(`/shop/orderCompleted/${orderId}`);
    redirect(`/shop/orderCompleted/${orderId}`);
  } else {
    return data;
  }
}

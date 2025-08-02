'use client';

import { Product, ProductListRes } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import {
  AddToCartRes,
  CartListRes,
  CartQuantityUpdateRes,
  DeleteCartsRes,
} from '@/types/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const accessToken = useAuthStore.getState().accessToken;

// 장바구니 목록 조회(로그인)
// export async function fetchCartList(page: number): Promise<Product[]> {
//   const res = await fetch(`${API_URL}/carts?page=${page}&limit=10`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Client-Id': CLIENT_ID,
//       Authorization: `Bearer ${accessToken}`,
//     },
//     next: {
//       tags: ['cart'],
//       revalidate: 10,
//     },
//     cache: 'force-cache',
//   });

//   const data: ProductListRes = await res.json();
//   if (!data.ok || !Array.isArray(data.item)) {
//     console.error('서버 응답 오류', data);
//     return [];
//   }

//   return data.item;
// }

// 장바구니 목록 조회(로그인)
export async function fetchCartList(
  page: number = 1,
  limit: number = 10,
): Promise<CartListRes> {
  // 디버깅 코드 추가
  console.log('환경 변수 확인:');
  console.log('NEXT_PUBLIC_API_URL:', API_URL);
  console.log('NEXT_PUBLIC_ACCESS_TOKEN:', accessToken);

  if (!API_URL || !accessToken) {
    throw new Error('환경 변수가 올바르게 설정되지 않았습니다.');
  }
  const res = await fetch(`${API_URL}/carts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('API 요청 실패:', res.status, res.statusText);
    throw new Error('장바구니 불러오기 실패');
  }

  const data = await res.json();

  // 데이터 검증
  if (!data.ok || !Array.isArray(data.item)) {
    console.error('서버 응답 데이터가 올바르지 않습니다:', data);
    throw new Error('서버 응답 데이터 오류');
  }

  return data; // CartListRes 타입 반환
}

// 장바구니 상품 추가
// export async function fetchAddToCart(
//   product_id: number,
//   quantity: number,
// ): Promise<AddToCartRes> {
//   console.log('환경 변수 확인:');
//   console.log('NEXT_PUBLIC_API_URL:', API_URL);
//   console.log('NEXT_PUBLIC_ACCESS_TOKEN:', accessToken);

//   if (!API_URL || !accessToken) {
//     throw new Error('환경 변수가 올바르게 설정되지 않았습니다.');
//   }

//   const res = await fetch(`${API_URL}/carts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Client-Id': CLIENT_ID,
//       Authorization: `Bearer ${accessToken}`,
//       // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
//     },
//     body: JSON.stringify({ product_id, quantity }),
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     console.error('API 요청 실패:', res.status, res.statusText);
//     throw new Error('장바구니 추가 실패');
//   }
//   // return await res.json();
//   const data = await res.json();
//   console.log('Fetched cart after addition:', data);
//   return data; // 서버 응답 데이터 반환
// }
export async function fetchAddToCart({
  product_id,
  quantity,
  size,
  color,
}: {
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
}) {
  try {
    // 옵션 검증: size와 color가 모두 있어야 요청 가능
    if (!size || !color) {
      throw new Error('사이즈와 색상을 모두 선택해주세요!');
    }

    const res = await fetch('${API_URL}/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      credentials: 'include', // 로그인 세션 필요
      body: JSON.stringify({
        product_id,
        quantity,
        ...(size && { size }), // size가 존재할 경우만 추가
        ...(color && { color }), // color가 존재할 경우만 추가
      }),
    });

    if (!res.ok) {
      throw new Error('장바구니 추가 실패');
    }

    // 업데이트된 장바구니 목록 반환
    return await res.json();
  } catch (error) {
    console.error('장바구니 추가 중 오류 발생:', error);
    throw error;
  }
}

// 장바구니 여러건 삭제
// export async function fetchdeleteCartsItems(
//   cartIds: number[],
// ): Promise<DeleteCartsRes> {
//   const res = await fetch(`${API_URL}/carts`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Client-Id': CLIENT_ID,
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({ carts: cartIds }),
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to delete cart items');
//   }

//   const data: DeleteCartsRes = await res.json();
//   return data;
// }

// 장바구니 상품 한 건 삭제
export async function deleteCartItem(id: number): Promise<DeleteCartsRes> {
  const res = await fetch(`${API_URL}/carts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('삭제 실패');
  return await res.json();
}

// 장바구니 상품 수량 수정
// export async function updateCartItemQuantity(
//   id: number,
//   quantity: number,
// ): Promise<CartQuantityUpdateRes> {
//   const res = await fetch(`${API_URL}/carts/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Client-Id': CLIENT_ID,
//       Authorization: `Bearer ${useAuthStore}`,
//     },
//     body: JSON.stringify({ quantity }),
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error(
//       '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
//     );
//   }

//   const data: CartQuantityUpdateRes = await res.json();
//   return data;
// }

export async function updateCartItemQuantity(
  id: number,
  quantity: number,
): Promise<CartQuantityUpdateRes> {
  const res = await fetch(`${API_URL}/carts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ quantity }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('수량 변경 실패');
  return await res.json();
}

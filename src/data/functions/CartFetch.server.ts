// data/functions/CartFetch.server.ts
'use server';

import { DeleteCartsRes, CartListRes, CartItem } from '@/types/cart';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 서버 컴포넌트용 장바구니 목록 조회 함수
export async function fetchCartList(
  page: number = 1,
  limit: number = 10,
): Promise<CartListRes> {
  try {
    // await 추가
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    // 토큰 없어도 진행하려면:
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
    };

    // 토큰이 있을 때만 추가
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store', // 항상 최신 데이터 가져오기
    });

    if (!response.ok) {
      console.error('API 요청 실패:', response.status, response.statusText);

      // 401 에러인 경우 (토큰 만료 등)
      if (response.status === 401) {
        return {
          ok: 1,
          item: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        };
      }

      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    const data = await response.json();

    // 데이터 검증 (클라이언트 코드와 동일하게)
    if (!data.ok || !Array.isArray(data.item)) {
      console.error('서버 응답 데이터가 올바르지 않습니다:', data);
      throw new Error('서버 응답 데이터 오류');
    }

    // 데이터 정규화 (클라이언트 코드와 동일하게)
    const validatedItems = data.item.map((item: CartItem) => ({
      ...item,
      price: item.price || 0,
      quantity: item.quantity || 1,
    }));

    console.log(
      '장바구니 데이터 조회 성공:',
      validatedItems.length,
      '개 아이템',
    );

    return { ...data, item: validatedItems };
  } catch (error) {
    console.error('Server fetch cart error:', error);
    // 에러 발생 시 빈 응답 반환 (페이지가 깨지지 않도록)
    return {
      ok: 1,
      item: [],
    };
  }
}

// 서버 액션 - 장바구니 개수 조회
export async function getCartCount(): Promise<number> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('장바구니 개수 조회 - 토큰:', accessToken ? '있음' : '없음');

    if (!accessToken) {
      return 0;
    }

    const response = await fetch(`${API_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('장바구니 개수 조회 실패:', response.status);
      return 0;
    }

    const data = await response.json();

    // 전체 아이템 수 반환 (pagination이 있으면 total, 없으면 item 배열 길이)
    const count = data.pagination?.total || data.item?.length || 0;
    console.log('장바구니 개수:', count);

    return count;
  } catch (error) {
    console.error('Failed to get cart count:', error);
    return 0;
  }
}

// 기존 삭제 함수
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

// 서버 액션 - 여러 건 삭제
export async function deleteMultipleCartItems(
  cartIds: number[],
): Promise<DeleteCartsRes> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      throw new Error('인증 토큰이 없습니다');
    }

    console.log('장바구니 삭제 요청 ID들:', cartIds);

    const res = await fetch(`${API_URL}/carts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ carts: cartIds }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('여러 건 삭제 실패:', res.status, res.statusText);
      throw new Error('Failed to delete cart items');
    }

    const data: DeleteCartsRes = await res.json();
    console.log('여러 건 삭제 성공:', data);

    return data;
  } catch (error) {
    console.error('여러 건 삭제 중 오류:', error);
    throw error;
  }
}

// 서버 액션 - 수량 수정
export async function updateCartItemQuantity(
  id: number,
  quantity: number,
): Promise<Record<string, string>> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      throw new Error('인증 토큰이 없습니다');
    }

    console.log('장바구니 수량 수정 요청:', { id, quantity });

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

    if (!res.ok) {
      console.error('수량 수정 실패:', res.status, res.statusText);
      throw new Error(`수량 수정 실패: ${res.statusText}`);
    }

    const data = await res.json();
    console.log('수량 수정 성공:', data);

    return data;
  } catch (error) {
    console.error('수량 수정 중 오류:', error);
    throw error;
  }
}

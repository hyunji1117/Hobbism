'use client';

import { OrderProducts } from '@/components/features/shopping-order/detail/OrderProducts';
import { fetchOrderDetail } from '@/data/functions/OrdersFetch';
import { useAuthStore } from '@/store/auth.store';
import { OrderInfoRes } from '@/types/orders';
import { useEffect, useState } from 'react';

export default function OrderDetailClient({ orderId }: { orderId: number }) {
  const accessToken = useAuthStore(state => state.accessToken);
  const user = useAuthStore(state => state.user);

  const [order, setOrder] = useState<OrderInfoRes | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!accessToken) {
        console.warn('accessToken 없음');
        return;
      }
      try {
        const data = await fetchOrderDetail(accessToken, orderId);

        setOrder(data);
      } catch (err) {
        console.error('fetchOrderDetail 에러:', err);
      }
    };

    loadData();
  }, [accessToken, orderId]);

  if (!accessToken) return <p>로그인이 필요합니다.</p>;
  if (!order || !order.item || !order.item.products)
    return <p>주문 정보를 불러오는 중...</p>;

  const products = order.item.products;
  const cost = order.item.cost;
  const options = order.item.selected_options ?? [];

  return (
    <>
      <section>
        <div>
          <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
            <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              주문 상품 {products.length}개
            </h2>
            <OrderProducts products={products} options={options} />
          </div>

          <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

          <div className="mx-3.5">
            <h2 className="mb-2 border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              배송 정보
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-sm">
              <dt className="text-[#4B5563]">수령인</dt>
              <dd>{user?.name}</dd>

              <dt className="text-[#4B5563]">휴대폰</dt>
              <dd>{user?.phone}</dd>

              <dt className="text-[#4B5563]">주소</dt>
              <dd>{user?.address}</dd>
            </dl>
          </div>

          <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

          <div className="mx-3.5 mb-5">
            <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              결제 내역
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
              <dt>총 상품 금액</dt>
              <dd className="text-right">{cost.products}원</dd>

              <dt>할인 금액</dt>
              <dd className="text-right">{cost?.discount.products ?? 0}원</dd>
            </dl>

            <span className="mt-2 flex w-full justify-between border-t border-t-[#EAEAEA] pt-2 font-bold">
              <h3>총 결제 금액</h3>
              <p>{cost.total}원</p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

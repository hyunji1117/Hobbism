'use client';

import { OrderProducts } from '@/components/features/shopping-order/detail/OrderProducts';
import { fetchOrderDetail } from '@/data/functions/OrdersFetch';
import { useAuthStore } from '@/store/auth.store';
import { OrderInfoRes } from '@/types/orders';
import { useEffect, useState } from 'react';

export default function OrderDetailClient({
  orderId,
  userInfo,
  addressInfo,
}: {
  orderId: number;
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
}) {
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

  const totalOriginalProducts = products.reduce((sum, p) => {
    if (!p.extra.originalPrice) return cost.total;
    return sum + p.extra.originalPrice * p.quantity;
  }, 0);

  const totalSale = products.reduce((sum, p) => {
    if (!p.extra.originalPrice) return sum;
    return sum + (p.extra.originalPrice - p.price) * p.quantity;
  }, 0);

  return (
    <>
      <section>
        <div>
          <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
            <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              주문 상품 {products.length}개
            </h2>
            <OrderProducts products={products} />
          </div>

          <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

          <div className="mx-3.5">
            <h2 className="mb-2 border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              배송 정보
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-sm">
              <dt className="text-[#4B5563]">수령인</dt>
              <dd>{userInfo.name} </dd>

              <dt className="text-[#4B5563]">휴대폰</dt>
              <dd>
                {userInfo.phone?.replace(/(\d{3})(\d{4})(\d{4})/, `$1-$2-$3`)}
              </dd>

              <dt className="text-[#4B5563]">주소</dt>
              <dd>
                {' '}
                [{addressInfo.postcode}] {addressInfo.address}{' '}
                {addressInfo.detailAddress && `(${addressInfo.detailAddress})`}
              </dd>
            </dl>
          </div>

          <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

          <div className="mx-3.5 mb-5">
            <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              결제 내역
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
              <dt>총 상품 금액</dt>
              {/* <dd className="text-right">{cost.products}원</dd> */}
              <dd className="text-right">{totalOriginalProducts}원</dd>

              <dt>할인 금액</dt>
              <dd className="text-right">{totalSale}원</dd>
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

'use client';

import {
  PaymentSelector,
  PaymentSummary,
  PurchaseAddress,
  PurchaseProductList,
} from '@/app/shop/purchase/purchaseComponents';
import { OrderProducts } from '@/components/features/shopping-order/detail/OrderProducts';
import { createOrder } from '@/data/actions/orders';
import { useAuthStore } from '@/store/auth.store';
import { usePurchaseStore } from '@/store/order.store';
import { Banknote, CreditCard, MapPin, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import toast from 'react-hot-toast';

export default function PurchaseClient({
  userInfo,
  addressInfo,
}: {
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
}) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const accessToken = useAuthStore(state => state.accessToken);
  const [state, formAction, isLoading] = useActionState(createOrder, null);

  const { purchaseData } = usePurchaseStore();

  const totalAmount = purchaseData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const products = purchaseData.map(item => ({
    ...item,
    _id: Number(item.id),
    quantity: Number(item.quantity),
  }));

  console.log('products 직렬화 테스트', JSON.stringify(products));

  return (
    <>
      <div className="pb-[10vh]">
        <PurchaseProductList />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PurchaseAddress userInfo={userInfo} addressInfo={addressInfo} />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PaymentSelector
          selected={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PaymentSummary />
      </div>

      <form
        action={formAction}
        onSubmit={e => {
          if (!selectedPayment) {
            e.preventDefault();
            toast.error('결제 수단을 선택해 주세요.');
            return;
          }

          if (!addressInfo.address || !addressInfo.postcode) {
            e.preventDefault();
            toast.error('배송지를 입력해 주세요.');
            return;
          }

          console.log('폼 제출');
        }}
      >
        <input type="hidden" name="products" value={JSON.stringify(products)} />

        <input type="hidden" name="accessToken" value={accessToken || ''} />

        <input
          type="hidden"
          name="selectedPayment"
          value={selectedPayment || ''}
        />

        {purchaseData.length > 0 && (
          <button
            type="submit"
            className="fixed bottom-[10vh] left-1/2 w-[93vw] max-w-[572px] -translate-x-1/2 rounded-xl bg-black py-4 text-lg font-semibold text-white md:w-full"
          >
            {totalAmount.toLocaleString()}원 결제하기
          </button>
        )}
      </form>
    </>
  );
}

// 공통 결제 버튼 컴포넌트 생성
'use client';

import { PaymentSelector } from '@/components/features/shopping-order/detail/purchase/PaymentSelector';
import { PaymentSummary } from '@/components/features/shopping-order/detail/purchase/PaymentSummary';
import { PurchaseAddress } from '@/components/features/shopping-order/detail/purchase/PurchaseAddress';
import { PurchaseProductList } from '@/components/features/shopping-order/detail/purchase/PurchaseProductList';
import { PaymentButton } from '@/components/common/PaymentButton';
import { createOrder } from '@/data/actions/orders';
import { useAuthStore } from '@/store/auth.store';
import { usePurchaseStore } from '@/store/order.store';
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

  //           state: localAddress 상태           //
  const [localAddressInfo, setLocalAddressInfo] = useState(addressInfo);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedPayment) {
      e.preventDefault();
      toast.error('결제 수단을 선택해 주세요.');
      return;
    }

    if (!localAddressInfo.address || !localAddressInfo.postcode) {
      e.preventDefault();
      toast.error('배송지를 입력해 주세요.');
      return;
    }

    console.log('폼 제출');
  };

  return (
    <>
      <div className="pb-[10vh]">
        <PurchaseProductList />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PurchaseAddress
          userInfo={userInfo}
          addressInfo={addressInfo}
          localAddressInfo={localAddressInfo}
          setLocalAddressInfo={setLocalAddressInfo}
        />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PaymentSelector
          selected={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
        <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>
        <PaymentSummary />
      </div>

      <form action={formAction} onSubmit={handleSubmit}>
        {/* Hidden inputs for form data */}
        <input type="hidden" name="products" value={JSON.stringify(products)} />
        {/* 유저 정보: 이름, 휴대폰 */}
        <input type="hidden" name="name" value={userInfo.name || ''} />
        <input type="hidden" name="phone" value={userInfo.phone || ''} />
        {/* 주소 정보: 주소, 상세 주소, 우편번호 */}
        <input
          type="hidden"
          name="address"
          value={localAddressInfo.address || ''}
        />
        <input
          type="hidden"
          name="detail"
          value={localAddressInfo.detailAddress || ''}
        />
        <input
          type="hidden"
          name="postcode"
          value={localAddressInfo.postcode || ''}
        />
        {/* accessToken */}
        <input type="hidden" name="accessToken" value={accessToken || ''} />
        {/* 결제방식 */}
        <input
          type="hidden"
          name="selectedPayment"
          value={selectedPayment || ''}
        />

        {/* 공통 결제 버튼 컴포넌트 사용 */}
        {purchaseData.length > 0 && (
          <PaymentButton
            amount={totalAmount}
            isLoading={isLoading}
            variant="fixed"
          />
        )}
      </form>
    </>
  );
}

'use client';

import {
  PaymentSelector,
  PaymentSummary,
  PurchaseAddress,
  PurchaseProductList,
} from '@/app/shop/purchase/purchaseComponents';
import { OrderProducts } from '@/components/features/shopping-order/detail/OrderProducts';
import { usePurchaseStore } from '@/store/order.store';
import { Banknote, CreditCard, MapPin, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PurchaseClient({
  userInfo,
  addressInfo,
}: {
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
}) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  // usePurchaseStore.setState({
  //   userInfo,
  //   addressInfo,
  // });

  return (
    <>
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
      <button>결제하기</button>
    </>
  );
}

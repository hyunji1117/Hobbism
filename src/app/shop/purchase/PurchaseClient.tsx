'use client';

import { Banknote, CreditCard, MapPin, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PurchaseClient() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  console.log(selectedPayment);

  return (
    <>
      <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

      <div className="mx-3.5">
        <div className="mb-2 flex justify-between border-b border-b-[#EAEAEA] pb-2">
          <h2 className="text-lg font-bold">배송 정보</h2>
          <button className="text-right font-semibold text-[#FE508B]">
            변경하기
          </button>
        </div>
        <div className="flex gap-2">
          <MapPin />
          <div className="leading-snug">
            <p className="font-semibold">홍길동</p>
            <p className="text-[#4B5563]">010-1234-1234</p>
            <p className="text-[#4B5563]">서울 어쩌꽁저꺼조저쩌구나라</p>
          </div>
        </div>
      </div>

      <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

      <div className="mx-3.5 mb-5">
        <h2 className="mb-2 border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          결제 수단
        </h2>

        <ul>
          <li className="mb-4 flex items-center gap-2">
            <input
              id="card"
              value="card"
              name="payment"
              type="radio"
              checked={selectedPayment === 'card'}
              onChange={() => setSelectedPayment('card')}
              className="h-5 w-5 appearance-none bg-[url('/images/ayoung/check-off.svg')] bg-contain bg-center bg-no-repeat checked:bg-[url('/images/ayoung/check-on.svg')]"
              aria-label="신용카드"
            />
            <label
              htmlFor="card"
              className="flex cursor-pointer items-center gap-2"
            >
              <CreditCard />
              <p>신용카드</p>
            </label>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <input
              id="cash"
              value="cash"
              name="payment"
              type="radio"
              checked={selectedPayment === 'cash'}
              onChange={() => setSelectedPayment('cash')}
              className="h-5 w-5 appearance-none bg-[url('/images/ayoung/check-off.svg')] bg-contain bg-center bg-no-repeat checked:bg-[url('/images/ayoung/check-on.svg')]"
              aria-label="무통장입금"
            />
            <label
              htmlFor="cash"
              className="flex cursor-pointer items-center gap-2"
            >
              <Banknote />
              <p>무통장입금</p>
            </label>
          </li>
          <li className="mb-4 flex items-center gap-2">
            <input
              id="simple"
              value="simple"
              name="payment"
              type="radio"
              checked={selectedPayment === 'simple'}
              onChange={() => setSelectedPayment('simple')}
              className="h-5 w-5 appearance-none bg-[url('/images/ayoung/check-off.svg')] bg-contain bg-center bg-no-repeat checked:bg-[url('/images/ayoung/check-on.svg')]"
              aria-label="간편결제"
            />
            <label
              htmlFor="simple"
              className="flex cursor-pointer items-center gap-2"
            >
              <WalletCards />
              <p>간편결제</p>
            </label>
          </li>
        </ul>
      </div>

      <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

      <div className="mx-3.5 mb-5">
        <span className="mb-2 flex w-full justify-between border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          <h2>총 결제 금액</h2>
          <p>1234원</p>
        </span>

        <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
          <dt>총 상품 금액</dt>
          <dd className="text-right">1234원</dd>

          <dt>할인 금액</dt>
          <dd className="text-right">1234원</dd>
        </dl>
      </div>
    </>
  );
}

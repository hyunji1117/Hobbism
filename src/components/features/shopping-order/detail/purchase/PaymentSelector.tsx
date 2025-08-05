'use client';

import { Banknote, ChevronDown, CreditCard, WalletCards } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function PaymentSelector({
  selected,
  setSelectedPayment,
}: {
  selected: string | null;
  setSelectedPayment: (method: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);
  const [selectBank, setSelectBank] = useState('은행선택');

  const banks = [
    '신한은행',
    '우리은행',
    '기업은행',
    '하나은행',
    '부산은행',
    '우체국',
    '케이뱅크',
  ];

  return (
    <>
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
              checked={selected === 'card'}
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
              checked={selected === 'cash'}
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
          {selected === 'cash' && (
            <div className="mb-3">
              <button
                onClick={toggleOpen}
                type="button"
                className="flex h-12 w-full justify-between rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
              >
                <p>{selectBank}</p>
                <ChevronDown />
              </button>

              {isOpen && (
                <ul className="w-full rounded-lg border border-[#e6e6e6] bg-white text-[#111111] outline-none focus:border-black">
                  {banks.map(bank => (
                    <li
                      key={bank}
                      onClick={() => {
                        setSelectBank(bank);
                        setIsOpen(false);
                      }}
                      className="border-b px-4 py-3.5 transition-all last:border-none hover:bg-[#f4f4f4]"
                    >
                      {bank}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <li className="mb-4 flex items-center gap-2">
            <input
              id="simple"
              value="simple"
              name="payment"
              type="radio"
              checked={selected === 'simple'}
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
          {selected === 'simple' && (
            <div>
              <ul className="grid w-full grid-cols-3 gap-2">
                <li>
                  <button className="flex h-[7vh] w-full items-center justify-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <div className="relative aspect-square w-4 md:w-5">
                      <Image
                        src="/kakaoIcon.svg"
                        alt={`kakao icon`}
                        fill
                        sizes="10vw"
                      />
                    </div>
                    <p className="ml-2 text-xs md:text-sm">카카오페이</p>
                  </button>
                </li>
                <li>
                  <button className="flex h-[7vh] w-full items-center justify-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <div className="relative aspect-square w-3 bg-black md:w-4">
                      <Image
                        src="/naverIcon.svg"
                        alt={`naver icon`}
                        fill
                        sizes="10vw"
                        className="p-0.5"
                      />
                    </div>
                    <p className="ml-2 text-xs md:text-sm">네이버페이</p>
                  </button>
                </li>
                <li>
                  <button className="flex h-[7vh] w-full items-center justify-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <div className="relative aspect-square w-3.5 md:w-4">
                      <Image
                        src="/tossIcon.svg"
                        alt={`toss icon`}
                        fill
                        sizes="10vw"
                      />
                    </div>
                    <p className="ml-2 text-xs md:text-sm">토스페이</p>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

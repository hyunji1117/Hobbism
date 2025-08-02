import { Banknote, CreditCard, WalletCards } from 'lucide-react';
import Image from 'next/image';

export function PaymentSelector({
  selected,
  setSelectedPayment,
}: {
  selected: string | null;
  setSelectedPayment: (method: string) => void;
}) {
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
            <form className="pb-5">
              <label className="sr-only">입금은행</label>
              <select
                name="bank"
                id="bank"
                className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
              >
                <option value="">은행 선택</option>
                <option value="">신한은행</option>
                <option value="">우리은행</option>
                <option value="">기업은행</option>
                <option value="">하나은행</option>
                <option value="">부산은행</option>
                <option value="">우체국</option>
                <option value="">케이뱅크</option>
              </select>
            </form>
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
              <ul className="flex gap-2">
                <li>
                  <button className="flex w-fit items-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <Image
                      src="/kakaoIcon.svg"
                      alt={`kakao icon`}
                      width={25}
                      height={25}
                    />
                    <p className="ml-2 text-sm">카카오페이</p>
                  </button>
                </li>
                <li>
                  <button className="flex w-fit items-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <span className="bg-black p-1">
                      <Image
                        src="/naverIcon.svg"
                        alt={`naver icon`}
                        width={12}
                        height={12}
                      />
                    </span>
                    <p className="ml-2 text-sm">네이버페이</p>
                  </button>
                </li>
                <li>
                  <button className="flex w-fit items-center rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black">
                    <Image
                      src="/tossIcon.svg"
                      alt={`toss icon`}
                      width={20}
                      height={20}
                    />
                    <p className="ml-2 text-sm">토스페이</p>
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

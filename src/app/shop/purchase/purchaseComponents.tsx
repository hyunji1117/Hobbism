import { usePurchaseStore } from '@/store/order.store';
import { Banknote, CreditCard, MapPin, WalletCards } from 'lucide-react';
import Image from 'next/image';

export function PurchaseProductList() {
  const { purchaseData } = usePurchaseStore();
  return (
    <>
      <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
        <h2 className="mx-3.5 border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          주문 상품 {purchaseData.length}개
        </h2>
        <ul>
          {purchaseData.map(product => (
            <li className="mt-3 flex gap-5" key={product.id}>
              <div className="relative aspect-square w-20">
                <Image
                  fill
                  src={product.productImg}
                  alt={product.productImg}
                  priority={true}
                  sizes="(max-width: 768px) 100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="rounded-2xl"
                />
              </div>
              <div className="leading-loose">
                <p className="text-sm font-bold">{product.name}</p>
                {product.selected_options?.map((option, i) => (
                  <p className="text-sm text-[#4B5563]" key={i}>
                    {option.extra.color ?? ''} {option.extra.size ?? ''}
                  </p>
                ))}
                <p className="text-md font-semibold">
                  {product.price * product.quantity}원{' '}
                  <span className="font-normal text-[#4B5563]">
                    {product.quantity}개
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function PurchaseAddress({
  userInfo,
  addressInfo,
}: {
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
}) {
  return (
    <>
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
            <p className="font-semibold">{userInfo.name}</p>
            <p className="text-[#4B5563]">{userInfo.phone}</p>
            <p className="text-[#4B5563]">
              [{addressInfo.postcode}] {addressInfo.address}{' '}
              {addressInfo.detailAddress && `(${addressInfo.detailAddress})`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

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
        </ul>
      </div>
    </>
  );
}

export function PaymentSummary() {
  const { purchaseData } = usePurchaseStore();
  console.log('purchaseData', purchaseData);

  return (
    <>
      {purchaseData.map(product => {
        const total = (product.price * product.quantity).toLocaleString();
        const originalTotal = product.originalPrice
          ? (product.originalPrice * product.quantity).toLocaleString()
          : total;
        const sale = (
          (product.originalPrice ? product.originalPrice - product.price : 0) *
          product.quantity
        ).toLocaleString();
        return (
          <>
            <div className="mx-3.5 mb-5" key={product.id}>
              <span className="mb-2 flex w-full justify-between border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
                <h2>총 결제 금액</h2>
                <p>{total}원</p>
              </span>
              <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
                <dt>총 상품 금액</dt>
                <dd className="text-right">{originalTotal}원</dd>
                <dt>할인 금액</dt>
                <dd className="text-right">{sale}원</dd>
              </dl>
            </div>
            {/* <button
              type="submit"
              className="w-full max-w-[600px] rounded-xl bg-black py-4 text-xl font-semibold text-white"
            >
              {total}원 결제하기
            </button> */}
          </>
        );
      })}
    </>
  );
}

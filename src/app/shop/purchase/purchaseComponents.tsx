'use client';

import Postcode from 'react-daum-postcode';
import { usePurchaseStore } from '@/store/order.store';
import { Banknote, CreditCard, MapPin, WalletCards, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/auth.store';
import { Address } from 'react-daum-postcode';
import { updateUserInfo } from '@/data/actions/user';
import toast from 'react-hot-toast';

export function PurchaseProductList() {
  const { purchaseData } = usePurchaseStore();
  return (
    <>
      <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
        <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
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
              <div>
                <p className="text-sm font-bold">{product.name}</p>
                {(product.size || product.color) && (
                  <p className="text-sm text-[#4B5563]">
                    <span className="mr-1">{product.size && product.size}</span>
                    <span>{product.color && product.color}</span>
                  </p>
                )}
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

//          interface: 주소 폼 입력 타입 정의          //
interface FormValues {
  address?: string;
  detail?: string;
  postcode?: string;
}

export function PurchaseAddress({
  userInfo,
  addressInfo,
}: {
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
}) {
  //          state: 주소 입력 폼 오픈 상태          //
  const [isOpen, setIsOpen] = useState(false);

  //          state: 로그인 유저 상태          //
  const currentUser = useAuthStore(state => state.user);
  //          state: accessToken 상태          //
  const accessToken = useAuthStore(state => state.accessToken);
  //           state: localAddress 상태           //
  const [localAddressInfo, setLocalAddressInfo] = useState(addressInfo);

  const { register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      address: addressInfo.address ?? '',
      detail: addressInfo.detailAddress ?? '',
      postcode: addressInfo.postcode ?? '',
    },
  });
  const toggleOpen = () => setIsOpen(prev => !prev);

  const onComplete = (data: Address) => {
    setValue('address', data.address);
    setValue('postcode', data.zonecode);
  };

  const onSubmit = async (data: FormValues) => {
    if (!currentUser) return;

    if (!accessToken) {
      console.error('AccessToken 없음');
      return;
    }

    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('address', data.address ?? '');
    formData.append('postcode', data.postcode ?? '');
    formData.append('detail', data.detail ?? '');
    if (!currentUser?._id) return;
    const res = await updateUserInfo(currentUser._id, formData);
    if (res.ok === 1) {
      toast.success('배송지가 변경되었습니다');
      setLocalAddressInfo({
        address: data.address ?? '',
        detailAddress: data.detail ?? '',
        postcode: data.postcode ?? '',
      });
    } else {
      console.error(res);
    }

    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-3.5">
        <div className="mb-2 flex justify-between border-b border-b-[#EAEAEA] pb-2">
          <h2 className="text-lg font-bold">배송 정보</h2>
          <button
            onClick={toggleOpen}
            className="text-right font-semibold text-[#FE508B]"
          >
            {!isOpen ? <span>배송지 변경</span> : <X />}
          </button>
        </div>
        {isOpen && (
          <form
            id="address-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 flex flex-col gap-2 px-3"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">주소</span>
                <div className="flex items-center gap-3">
                  <input
                    {...register('postcode')}
                    className="h-9 w-22 rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
                    placeholder="우편번호"
                    readOnly
                  />
                  <button type="submit" className="cursor-pointer">
                    저장
                  </button>
                </div>
              </div>

              <input
                {...register('address')}
                placeholder="주소 입력은 아래 검색 창을 통해 가능합니다"
                className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
                readOnly
              />
            </div>
            <input
              {...register('detail')}
              placeholder="나머지 주소를 입력하세요 (예: 101동 202호)"
              className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
            />

            <div className="mt-3 overflow-hidden rounded-md border">
              <Postcode
                onComplete={onComplete}
                autoClose={false}
                className="h-[400px] w-full"
              />
            </div>
          </form>
        )}

        <div className="flex gap-2">
          <MapPin />
          <div className="leading-relaxed">
            <p className="font-semibold">
              {userInfo.name}{' '}
              <span className="font-light text-[#4B5563]">
                {userInfo.phone?.replace(/(\d{3})(\d{4})(\d{4})/, `$1-$2-$3`)}
              </span>
            </p>
            {localAddressInfo.address ? (
              <p className="text-[#4B5563]">
                [{localAddressInfo.postcode}] {localAddressInfo.address}{' '}
                {localAddressInfo.detailAddress &&
                  `(${localAddressInfo.detailAddress})`}
              </p>
            ) : (
              <p className="text-[#4B5563]">
                배송지가 비어 있습니다. 배송지를 입력해 주세요.
              </p>
            )}
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
        );
      })}
    </>
  );
}

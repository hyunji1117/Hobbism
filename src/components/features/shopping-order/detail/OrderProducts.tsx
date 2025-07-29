import Image from 'next/image';

export function OrderProducts() {
  return (
    <div>
      <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
        <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          주문 상품 2개
        </h2>
        <ul>
          <li className="mt-3 flex gap-5">
            <div className="relative aspect-square w-20">
              <Image
                fill
                src="/images/ayoung/products/dress/ankrouge-03-01.webp"
                alt="상품 사진 1"
                priority={false}
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="rounded-2xl"
              />
            </div>
            <div>
              <p className="text-sm font-bold">프리미엄 면 티셔츠</p>
              <p className="text-sm text-[#4B5563]">[85] M size</p>
              <p className="text-md font-semibold">29,000원</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

      <div className="mx-3.5">
        <h2 className="mb-2 border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          배송 정보
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-sm">
          <dt className="text-[#4B5563]">수령인</dt>
          <dd>홍길동</dd>

          <dt className="text-[#4B5563]">휴대폰</dt>
          <dd>010-1234-1234</dd>

          <dt className="text-[#4B5563]">주소</dt>
          <dd>서울 종로구 종로3길 17 D타워 16, 17층</dd>
        </dl>
      </div>

      <div className="my-5 h-2 w-full bg-[#F3F4F6]"></div>

      <div className="mx-3.5">
        <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          결제 내역
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
          <dt>결제 수단</dt>
          <dd>카카오페이</dd>

          <dt>총 상품 금액</dt>
          <dd>
            <span className="font-semibold text-[#FE508B]">20%</span> 10000원
          </dd>
        </dl>

        <span className="mt-2 flex w-full justify-between border-t border-t-[#EAEAEA] pt-2 font-bold">
          <h3>총 결제 금액</h3>
          <p>10000원</p>
        </span>
      </div>
    </div>
  );
}

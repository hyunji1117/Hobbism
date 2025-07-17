import { Minus, Plus } from 'lucide-react';

// 상품 상세 정보 컴포넌트
export const ProductDetailInfo = () => {
  return (
    <section className="h-[160px] items-center justify-center p-5">
      <h1 className="text-[24px] font-semibold text-black">
        아디다스 언더아머 2.0 윈터브레이크
      </h1>
      <p className="text-[14px] text-[#4B5563]">정보를 적어주세요.</p>
      <span className="flex flex-col pt-2 text-[12px] text-[#C3C3C3]">
        167,000원
      </span>
      <div className="mt-1 flex items-center">
        <span className="pr-2 text-[24px] font-semibold text-[#EF4444]">
          30%
        </span>
        <span className="justify-self-center text-[24px] font-semibold text-black">
          139,000원
        </span>
        <span className="ml-auto flex h-[28px] w-[76px] items-center justify-center rounded-[4px] bg-[#F3F4F6] text-[14px] text-black">
          무료배송
        </span>
      </div>
    </section>
  );
};

// 상품 수량 선택 컴포넌트
export const ProductQuantitySelector = () => {
  return (
    <section className="h-[100px] w-[350px] rounded-[8px] bg-[#EAEAEA] p-3">
      <h2 className="mb-4 text-[18px] font-semibold text-black">
        리미티드 스페이스블랙 L
      </h2>
      <div id="counter" className="flex gap-4">
        <button
          type="button"
          className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[18px] leading-none text-[#4B5563]"
        >
          <Minus className="h-[20] w-[20]" />
        </button>
        <button
          type="button"
          className="text-[18px] font-semibold text-[#4B5563]"
        >
          0
        </button>
        <button
          type="button"
          className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[18px] leading-none text-[#4B5563]"
        >
          <Plus className="h-[20] w-[20]" />
        </button>
        <span className="ml-auto flex items-center justify-center text-[18px] font-semibold text-black">
          158,900원
        </span>
      </div>
    </section>
  );
};

// 상품 액션 버튼 컴포넌트
export const ProductActionButtons = () => {
  return (
    <section className="flex h-[54px] gap-3">
      <button
        type="button"
        className="w-[40%] rounded-[8px] bg-[#EAEAEA] text-[16px]"
      >
        장바구니 담기
      </button>
      <button
        type="button"
        className="w-[60%] rounded-[8px] bg-[#FE508B] text-[18px] font-semibold text-white"
      >
        구매하기
      </button>
    </section>
  );
};

// 옵션 선택 컴포넌트 클라이언트 사이드 관리로 별도 파일 생성 (OptionSelector.tsx)

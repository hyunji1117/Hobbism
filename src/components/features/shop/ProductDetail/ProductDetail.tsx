'use client';

import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

// 상품 상세 정보 컴포넌트
export const ProductDetailInfo = ({
  item,
  price,
  discountRate,
  extra,
  sizes,
  colors,
}) => {
  const recommendData = {
    inhwan: { name: '인환', color: 'bg-[#FE508B]', textColor: 'text-white' },
    hyunji: { name: '현지', color: 'bg-[#FAB91D]', textColor: 'text-black' },
    woomin: { name: '우민', color: 'bg-[#51AAED]', textColor: 'text-white' },
    youngchan: { name: '영찬', color: 'bg-[#D2E308]', textColor: 'text-black' },
    ayoung: { name: '아영', color: 'bg-[#6E67DA]', textColor: 'text-white' },
  };

  const recommendInfo = extra?.recommendedBy
    ? recommendData[extra.recommendedBy]
    : null;

  const originalPrice = extra.originalPrice;

  return (
    <section className="h-auto items-center justify-center px-5 py-4">
      {recommendInfo && (
        <span
          className={`mb-2 flex h-[28px] w-[76px] items-center justify-center rounded-[6px] text-[12px] ${recommendInfo.color} ${recommendInfo.textColor}`}
        >
          {recommendInfo.name} PICK
        </span>
      )}
      <h1 className="relative text-[24px] font-semibold text-black">
        {item.name}
      </h1>
      <span className="flex flex-col pt-2 text-[12px] text-[#C3C3C3] line-through">
        {originalPrice.toLocaleString()}원
      </span>
      <div className="mt-1 flex items-center">
        {discountRate > 0 && (
          <span className="pr-2 text-[24px] font-semibold text-[#F05656]">
            {discountRate.toLocaleString()}%
          </span>
        )}
        <span className="justify-self-center text-[24px] font-semibold text-black">
          {item.price.toLocaleString()}원
        </span>
        <span className="ml-auto flex h-[30px] w-[76px] items-center justify-center rounded-[3px] bg-[#F3F4F6] text-[14px] text-black">
          무료배송
        </span>
      </div>
    </section>
  );
};

// ProductDetail 컴포넌트
export const ProductDetail = ({
  product,
  options,
}: {
  product: { id: string; name: string; price: number };
  options?: { id: string; name: string; price: number }[];
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 중복 담기 방지 상태
  const [isRequesting, setIsRequesting] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option); // 선택된 옵션 저장
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));

  // 장바구니 담기 API 예시 함수
  const addToCartApi = async () => {
    // 실제 API 호출로 교체
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  // 장바구니 담기 클릭 핸들러
  const handleCartClick = async () => {
    if (isRequesting) return;
    setIsRequesting(true);
    try {
      await addToCartApi();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div>
      {/* 상품 상세 정보 */}
      <ProductDetailInfo
        item={{
          _id: parseInt(product.id),
          name: product.name,
          price: product.price,
        }}
        price={product.price}
        discountRate={0}
        extra={{
          recommendedBy: 'MD 이름',
          originalPrice: product.price * 1.2,
        }}
        sizes={[]}
        colors={[]}
      />

      {/* 옵션 선택 */}
      {options && (
        <div className="mt-4">
          <h3 className="text-[16px] font-semibold">옵션 선택</h3>
          <ul className="mt-2">
            {options.map(option => (
              <li key={option.id}>
                <button
                  onClick={() => handleOptionSelect(option.name)}
                  className="w-full rounded-[8px] border border-[#EAEAEA] p-2 text-left text-[14px] hover:bg-[#F3F4F6]"
                >
                  {option.name} - {option.price.toLocaleString()}원
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedOption && (
        <ProductQuantitySelector
          selectedOption={selectedOption}
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          price={product.price}
          originalPrice={product.price * 1.2}
          item={{ name: product.name }}
        />
      )}

      {/* 상품 액션 버튼 */}
      <ProductActionButtons
        onCartClick={handleCartClick}
        onBuyNowClick={() => {}} // 구매하기 로직 필요시 구현
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          productImg: '', // 필요시 이미지 전달
        }}
        options={options}
        cartButtonDisabled={isRequesting}
      />
    </div>
  );
};

// 수량 컨트롤
export const ProductQuantitySelector = ({
  selectedOption,
  quantity,
  onIncrease,
  onDecrease,
  price,
  originalPrice,
  item,
}: {
  selectedOption: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  price: number;
  originalPrice: number;
  item: { name: string };
}) => {
  return (
    <section className="mx-4 my-4 h-auto rounded-[8px] bg-[#EAEAEA] p-3">
      <div className="flex items-start justify-between">
        <h2 className="text-[18px] font-semibold text-black">{item.name}</h2>
        {/* selectedOption이 있을 경우에만 표시 */}
        {selectedOption && (
          <span className="pl-4 text-[14px] font-medium whitespace-nowrap text-[#4B5563]">
            {selectedOption}
          </span>
        )}
      </div>
      <div id="counter" className="mt-4 flex gap-4">
        <button
          type="button"
          className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border ${
            quantity === 1
              ? 'border-[#ECEDEE] bg-[#C3C3C3]'
              : 'border-[#ECEDEE] bg-white'
          } text-[18px] leading-none text-[#ECEDEE]`}
          onClick={onDecrease}
          disabled={quantity === 1}
        >
          <Minus size={20} color="#787878" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="cursor-pointer px-2 text-[18px] font-semibold text-[#787878]"
        >
          {quantity}
        </button>
        <button
          type="button"
          className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-[#ECEDEE] bg-white text-[18px] leading-none text-[#4B5563]"
          onClick={onIncrease}
        >
          <Plus size={20} strokeWidth={1.5} color="#787878" />
        </button>
        <span className="ml-auto flex items-center justify-center text-[18px] font-semibold text-black">
          {(quantity * price).toLocaleString()}원
        </span>
      </div>
    </section>
  );
};

// 상품 액션 버튼 컴포넌트
interface ProductActionButtonsProps {
  onCartClick: () => void;
  onBuyNowClick: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    productImg: string;
  };
  options?: { id: string; name: string; price: number }[];
  cartButtonDisabled?: boolean;
}

export const ProductActionButtons = ({
  onCartClick,
  onBuyNowClick,
  product,
  options,
  cartButtonDisabled = false,
}: ProductActionButtonsProps) => {
  return (
    <div className="mb-1 flex h-[50px] justify-between gap-3">
      <button
        onClick={onCartClick}
        disabled={cartButtonDisabled}
        className={`w-[40%] min-w-[105px] cursor-pointer rounded-[5px] border border-[#C3C3C3] px-2 py-2 text-[16px] text-black hover:bg-[#EAEAEA] ${
          cartButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        장바구니 담기
      </button>
      <button
        onClick={onBuyNowClick}
        className="w-[60%] min-w-[105px] cursor-pointer rounded-[5px] bg-[#4B5563] px-2 py-2 text-[18px] font-semibold text-white hover:bg-[#2C2F33]"
      >
        구매하기
      </button>
    </div>
  );
};

// 총 결제 금액 컴포넌트
export const TotalPrice = ({
  quantity,
  price,
  originalPrice,
}: {
  quantity: number;
  price: number;
  originalPrice?: number;
}) => {
  const totalPrice = quantity * (price ?? originalPrice);

  return (
    <section className="z-20 mb-1 flex h-[50px] items-center justify-between border-t border-[#EAEAEA] bg-white px-4 pt-4">
      <span className="text-[18px] font-semibold text-black">총 결제 금액</span>
      <span className="text-[24px] font-semibold text-black">
        {totalPrice.toLocaleString()}원
      </span>
    </section>
  );
};

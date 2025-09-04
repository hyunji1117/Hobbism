// 장바구니 결제 정보 요약 컴포넌트
'use client';

interface CartSummaryProps {
  totalPrice: number;
  shippingFee?: number;
  discount?: number;
}

export function CartSummary({
  totalPrice,
  shippingFee = 0,
  discount = 0,
}: CartSummaryProps) {
  const finalPrice = totalPrice - discount + shippingFee;

  return (
    <div className="mx-4 my-6 flex flex-col gap-y-4 pb-[80px]">
      <div className="flex justify-between">
        <span className="text-[#4B5563]">총 상품금액</span>
        <span className="right-4 font-medium">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between">
          <span className="text-[#4B5563]">할인금액</span>
          <span className="right-4 text-red-500">
            -{discount.toLocaleString()}원
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-[#4B5563]">배송비</span>
        <span className="right-4">
          {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
        </span>
      </div>

      <div className="flex justify-between border-t pt-4">
        <span className="text-lg leading-6 font-semibold">총 결제금액</span>
        <span className="right-4 text-lg leading-6 font-semibold text-[#F05656]">
          {finalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}

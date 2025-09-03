// 상품 상세 정보, 수량 선택, 총 결제 금액 컴포넌트
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { TotalPrice } from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';
import { ProductQuantitySelector } from '@/components/features/shop/ProductDetail/ProductDetail';
import { fetchAddToCart } from '@/data/functions/CartFetch.client';
import { PaymentButton } from '@/components/common/PaymentButton';
import { usePurchaseStore } from '@/store/order.store';
import { SmallLoading } from '@/components/common/SmallLoading';
import toast from 'react-hot-toast';

export default function CartAction({
  price,
  options,
  discountRate,
  item,
}: {
  price: number;
  options: { size: number[] | string[]; color: string[] };
  discountRate: number;
  item: {
    id: string;
    name: string;
    price: number;
    productImg?: string;
    originalPrice?: number;
  };
}) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasOptions = options && (options.size || options.color);

  const resetOptions = () => {
    setSelectedSize(undefined);
    setSelectedColor(undefined);
    setLoading(false);
  };

  // 버튼 텍스트 결정 함수
  const getButtonText = () => {
    if (loading) return '처리 중...';
    if (price * quantity !== undefined)
      return `${(price * quantity).toLocaleString()}원 결제하기`;
    return '결제하기';
  };

  // 옵션 선택 시 버튼 활성화
  const handleOptionSelect = (type: 'size' | 'color', value: string) => {
    if (type === 'size') setSelectedSize(value);
    if (type === 'color') setSelectedColor(value);
  };

  // 장바구니 담기
  const handleAddToCart = async () => {
    if (loading) return;

    if (isBottomSheetOpen) {
      // 옵션이 있는 경우
      if (hasOptions) {
        const sizeRequired = options?.size?.length && !selectedSize;
        const colorRequired = options?.color?.length && !selectedColor;

        if (sizeRequired && colorRequired) {
          toast.error('옵션을 모두 선택해 주세요!');
          return;
        }
        if (sizeRequired || colorRequired) {
          toast.error('옵션을 선택해 주세요!');
          return;
        }
      }

      setLoading(true);

      try {
        const response = await fetchAddToCart({
          product_id: Number(item.id),
          quantity,
          size: selectedSize,
          color: selectedColor,
        });
        console.log('장바구니 추가 성공 응답:', response);

        toast.success('장바구니에 상품이 추가되었습니다!');
        setIsBottomSheetOpen(false);
        resetOptions();
      } catch (error) {
        console.error('장바구니 추가 중 오류 발생:', error);
        toast.error('새로고침 후 다시 시도해주세요');
      } finally {
        setLoading(false);
      }
    } else {
      setIsBottomSheetOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (!isBottomSheetOpen) {
      setIsBottomSheetOpen(true);
      return;
    }
    if (hasOptions) {
      const sizeRequired = options?.size?.length && !selectedSize;
      const colorRequired = options?.color?.length && !selectedColor;

      if (sizeRequired || colorRequired) {
        toast.error('옵션을 선택해주세요!');
        return;
      }
    }

    setIsBottomSheetOpen(false);
    setLoading(true);

    const purchaseData = {
      id: item.id,
      name: item.name,
      originalPrice: item.originalPrice,
      price: item.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      productImg: item.productImg || '',
    };

    console.log('purchaseData', purchaseData);

    usePurchaseStore.getState().setPurchaseData([purchaseData]);
    router.push(`/shop/purchase`);
    resetOptions();
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => {
      setIsBottomSheetOpen(false);
      resetOptions();
    },
    trackMouse: true,
  });

  // 옵션이 모두 선택되어야 버튼 활성화
  const isOptionSelected =
    (options?.size?.length ? !!selectedSize : true) &&
    (options?.color?.length ? !!selectedColor : true);

  return (
    <>
      {/* 상품 액션 버튼 - 공통 컴포넌트 사용 */}
      <div className="fixed bottom-0 z-30 w-full max-w-[600px] bg-white px-4 py-3">
        <div className="mb-3 flex h-[50px] justify-between gap-1.5">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`w-[40%] min-w-[105px] cursor-pointer rounded-[5px] border border-[#C3C3C3] px-2 py-2 text-[16px] text-black hover:bg-[#EAEAEA] ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            장바구니 담기
          </button>

          <PaymentButton
            onClick={handleBuyNow}
            variant="primary"
            isLoading={loading}
            text={getButtonText()}
            amount={price * quantity}
          />
        </div>
      </div>

      {/* 바텀시트 어두운 배경 */}
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center"
          onClick={() => {
            setIsBottomSheetOpen(false);
            resetOptions();
          }}
        >
          <div className="h-full w-full max-w-[600px] bg-black opacity-50"></div>
        </div>
      )}

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          {...swipeHandlers}
          className={`fixed z-20 flex w-full max-w-[600px] min-w-[300px] flex-col rounded-t-[16px] bg-white shadow-lg ${
            hasOptions ? 'bottom-[78px]' : 'bottom-[78px]'
          }`}
        >
          <div className="flex justify-center">
            <div className="mt-1.5 h-[4px] w-[100px] rounded-full bg-[#EAEAEA]" />
          </div>

          {hasOptions ? (
            <>
              {/* 사이즈 옵션 */}
              {options.size && (
                <div className="bg-white px-4 pt-3.5 pb-3">
                  <OptionSelector
                    name="사이즈"
                    options={options.size}
                    selectedOption={selectedSize || ''}
                    onSelect={value => handleOptionSelect('size', value)}
                    onOpen={() => setSelectedSize('')}
                  />
                </div>
              )}

              {options.color && (
                <div className="bg-white px-4 pt-3.5 pb-3">
                  <OptionSelector
                    name="색상"
                    options={options.color}
                    selectedOption={selectedColor || ''}
                    onSelect={value => handleOptionSelect('color', value)}
                    onOpen={() => setSelectedColor('')}
                  />
                </div>
              )}

              {(selectedSize || selectedColor) && (
                <ProductQuantitySelector
                  selectedOption={`${
                    selectedSize ? `${selectedSize}` : ''
                  }${selectedSize && selectedColor ? ' | ' : ''}${
                    selectedColor ? `${selectedColor}` : ''
                  }`}
                  quantity={quantity}
                  onIncrease={() => setQuantity(prev => prev + 1)}
                  onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                  price={item.price}
                  originalPrice={item.originalPrice || item.price}
                  item={item}
                />
              )}
              {(selectedSize || selectedColor) && (
                <TotalPrice
                  quantity={quantity}
                  price={item.price}
                  originalPrice={item.originalPrice}
                />
              )}
            </>
          ) : (
            <>
              <ProductQuantitySelector
                selectedOption=""
                quantity={quantity}
                onIncrease={() => setQuantity(prev => prev + 1)}
                onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                price={item.price}
                originalPrice={item.originalPrice || item.price}
                item={item}
              />
              <TotalPrice
                quantity={quantity}
                price={item.price}
                originalPrice={item.originalPrice}
              />
            </>
          )}
        </div>
      )}

      {loading && <SmallLoading />}
    </>
  );
}

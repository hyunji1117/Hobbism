// QuickCartBottomSheet.tsx - 재사용 가능한 바텀시트 컴포넌트
'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TotalPrice } from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { ProductQuantitySelector } from '@/components/features/shop/ProductDetail/ProductDetail';
import { fetchAddToCart } from '@/data/functions/CartFetch.client';
import { useCartState } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface QuickCartBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  price: number;
  originalPrice?: number;
  options?: { size?: (string | number)[]; color?: string[] };
  onSuccess?: () => void;
}

export const QuickCartBottomSheet = ({
  isOpen,
  onClose,
  productId,
  productName,
  price,
  originalPrice,
  options,
  onSuccess,
}: QuickCartBottomSheetProps) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { refreshCartCount } = useCartState();

  const hasOptions =
    options && (options?.size?.length || options?.color?.length);

  const resetOptions = () => {
    setSelectedSize(undefined);
    setSelectedColor(undefined);
    setQuantity(1);
    setLoading(false);
  };

  const handleClose = () => {
    resetOptions();
    onClose();
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: handleClose,
    trackMouse: true,
  });

  const handleAddToCart = async () => {
    if (loading) return;

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
        product_id: productId,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
      console.log('장바구니 추가 성공 응답:', response);

      await refreshCartCount();
      toast.success('장바구니에 상품이 추가되었습니다!');
      handleClose();
      onSuccess?.();
    } catch (error) {
      console.error('장바구니 추가 중 오류 발생:', error);
      toast.error('새로고침 후 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
  };

  const isOptionSelected =
    (options?.size?.length ? !!selectedSize : true) &&
    (options?.color?.length ? !!selectedColor : true);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center"
        onClick={handleClose}
      >
        <div className="h-full w-full max-w-[600px] bg-black opacity-50"></div>
      </div>

      {/* 바텀시트 */}
      <div
        {...swipeHandlers}
        className="fixed bottom-0 z-20 flex w-full max-w-[600px] min-w-[300px] flex-col rounded-t-[16px] bg-white shadow-lg"
      >
        <div className="flex justify-center">
          <div className="mt-1.5 h-[4px] w-[100px] rounded-full bg-[#EAEAEA]" />
        </div>

        {hasOptions ? (
          <>
            {options.size && (
              <div className="bg-white px-4 pt-3.5 pb-3">
                <OptionSelector
                  name="사이즈"
                  options={
                    options.size.filter(
                      option => typeof option === 'string',
                    ) as string[]
                  }
                  selectedOption={selectedSize || ''}
                  onSelect={value => setSelectedSize(value)}
                  onOpen={() => setSelectedSize('')}
                />
              </div>
            )}

            {options.color && (
              <div className="bg-white px-4 pt-3.5 pb-3">
                <OptionSelector
                  name="색상"
                  options={
                    options.color.filter(
                      option => typeof option === 'string',
                    ) as string[]
                  }
                  selectedOption={selectedColor || ''}
                  onSelect={value => setSelectedColor(value)}
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
                price={price}
                originalPrice={originalPrice || price}
                item={{ name: productName }}
              />
            )}

            {(selectedSize || selectedColor) && (
              <TotalPrice
                quantity={quantity}
                price={price}
                originalPrice={originalPrice}
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
              price={price}
              originalPrice={originalPrice || price}
              item={{ name: productName }}
            />
            <TotalPrice
              quantity={quantity}
              price={price}
              originalPrice={originalPrice}
            />
          </>
        )}

        <div className="px-4 py-3">
          <button
            onClick={handleAddToCart}
            disabled={!isOptionSelected || loading}
            className={`w-full rounded-[5px] py-3 text-[16px] font-medium transition-colors ${
              isOptionSelected && !loading
                ? 'bg-black text-white hover:bg-gray-800'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
            }`}
          >
            {loading ? '처리 중...' : '장바구니 담기'}
          </button>
        </div>
      </div>
    </>
  );
};

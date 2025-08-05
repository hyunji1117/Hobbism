'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import {
  ProductActionButtons,
  TotalPrice,
} from '@/components/features/shop/ProductDetail/ProductDetail';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';
import { ProductQuantitySelector } from '@/components/features/shop/ProductDetail/ProductDetail';
import { fetchAddToCart } from '@/data/functions/CartFetch.client';

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
  const allOptionsSelected = !hasOptions || (selectedSize && selectedColor);

  const resetOptions = () => {
    setSelectedSize(undefined);
    setSelectedColor(undefined);
  };

  const handleAddToCart = async () => {
    if (isBottomSheetOpen) {
      if (
        (options?.size?.length && !selectedSize) ||
        (options?.color?.length && !selectedColor)
      ) {
        toast.error('옵션을 모두 선택해 주세요!');
        return;
      }
      setLoading(true);
      try {
        const response = await fetchAddToCart({
          product_id: Number(item.id),
          quantity,
          size: selectedSize?.toString(),
          color: selectedColor,
        });
        console.log('장바구니 추가 성공 응답:', response);

        toast.success('장바구니에 상품이 추가되었습니다!');
        setIsBottomSheetOpen(false);
        resetOptions(); // 옵션 초기화
      } catch (error) {
        console.error('장바구니 추가 중 오류 발생:', error);
        toast.error('장바구니 추가에 실패했습니다.');
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
    if (
      (options?.size?.length && !selectedSize) ||
      (options?.color?.length && !selectedColor)
    ) {
      toast.error('옵션을 모두 선택해주세요!');
      return;
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
    resetOptions(); // 옵션 초기화
  };

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => {
      setIsBottomSheetOpen(false);
      resetOptions(); // 옵션 초기화
    },
    trackMouse: true,
  });

  return (
    <>
      {/* 상품 액션 버튼 */}
      <div className="bt-rounded-[8px] fixed bottom-0 z-30 w-full max-w-[600px] bg-white px-5 py-3">
        <ProductActionButtons
          onCartClick={handleAddToCart}
          onBuyNowClick={handleBuyNow}
          product={{
            id: item.id,
            name: item.name,
            price: item.price,
            productImg: item.productImg || '',
          }}
          options={options?.size?.map(size => ({
            id: size.toString(),
            name: `사이즈 ${size}`,
            price: item.price,
          }))}
        />
      </div>

      {/* 바텀시트 어두운 배경 */}
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center"
          onClick={() => {
            setIsBottomSheetOpen(false);
            resetOptions(); // 옵션 초기화
          }}
        >
          <div className="h-full w-full max-w-[600px] bg-black opacity-50"></div>
        </div>
      )}

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          {...swipeHandlers}
          className={`fixed z-20 flex w-full max-w-[600px] flex-col rounded-t-[16px] bg-white shadow-lg ${
            hasOptions ? 'bottom-[78px]' : 'bottom-[78px]'
          }`}
        >
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]" />
          </div>

          {hasOptions ? (
            <>
              {/* 사이즈 옵션 */}
              {options.size && (
                <div className="bg-white px-5 pt-3.5">
                  <OptionSelector
                    name="사이즈"
                    options={options.size}
                    selectedOption={selectedSize || ''} // 초기 상태에서는 빈 값
                    onSelect={value => setSelectedSize(value)}
                    onOpen={() => setSelectedSize('')} // 드롭다운 열릴 때 초기화
                  />
                </div>
              )}

              {options.color && (
                <div className="bg-white px-5 pt-3.5">
                  <OptionSelector
                    name="색상"
                    options={options.color}
                    selectedOption={selectedColor || ''} // 초기 상태에서는 빈 값
                    onSelect={value => setSelectedColor(value)}
                    onOpen={() => setSelectedColor('')} // 드롭다운 열릴 때 초기화
                  />
                </div>
              )}

              {allOptionsSelected && (
                <ProductQuantitySelector
                  selectedOption={`사이즈: ${selectedSize}, 색상: ${selectedColor}`}
                  quantity={quantity}
                  onIncrease={() => setQuantity(prev => prev + 1)}
                  onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                  price={item.price}
                  originalPrice={item.originalPrice || item.price}
                  item={item}
                />
              )}
              {allOptionsSelected && (
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

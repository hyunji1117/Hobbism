'use client';

import { useState } from 'react';
import { OptionSelector } from '@/components/features/shop/ProductDetail/OptionSelector';
import { ProductQuantitySelector } from '@/components/features/shop/ProductDetail/ProductDetail';
import { useSwipeable } from 'react-swipeable';
import {
  ProductActionButtons,
  TotalPrice,
} from '@/components/features/shop/ProductDetail/ProductDetail';
import {
  fetchAddToCart,
  fetchCartList,
} from '@/data/functions/CartFetch.client';
import { useCartStore } from '@/store/cartStore';

export default function CartAction({
  originalPrice,
  item,
  options,
  discountRate,
}: {
  originalPrice: number;
  item: { id: string; name: string; price: number; productImg?: string };
  options: { name: string; values: string[] }[];
  discountRate: number;
}) {
  // 옵션 상태(옵션명 key, 선택값 value)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [quantity, setQuantity] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // zustand cartStore 연동
  const setCartItems = useCartStore(state => state.setCartItems);

  // 옵션 존재 여부, 전체 옵션이 모두 선택되었는지 체크
  const hasOptions = Array.isArray(options) && options.length > 0;
  const allOptionsSelected =
    !hasOptions || options.every(opt => !!selectedOptions[opt.name]);

  // 옵션 변경 핸들러
  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = async () => {
    if (!allOptionsSelected) {
      alert('모든 옵션을 선택해주세요!');
      return;
    }
    if (quantity < 1) {
      alert('수량을 1개 이상 선택해주세요!');
      return;
    }

    setLoading(true);
    try {
      // undefined, 빈값 등은 제거
      const cleanOptions = Object.fromEntries(
        Object.entries(selectedOptions).filter(([_, v]) => !!v),
      );

      // 옵션이 있으면 자동으로 필드 생성
      const body = {
        product_id: Number(item.id),
        quantity,
        ...cleanOptions, // size: "270", color: "red"
      };
      // 서버 전송
      await fetchAddToCart(body);
      // 서버 최신 장바구니 fetch
      const updatedCart = await fetchCartList();
      // zustand 전역 상태 갱신
      setCartItems(
        (updatedCart.item as any[])?.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          mainImages: item.mainImages,
        })) ?? [],
      );

      alert('장바구니에 상품이 추가되었습니다!');
      setIsBottomSheetOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('장바구니 추가 중 오류:', error);
        alert(error.message || '장바구니 추가에 실패했습니다.');
      } else {
        console.error('알 수 없는 오류 발생:', error);
        alert('장바구니 추가에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 하단 고정 상품 액션 버튼 */}
      <div className="fixed bottom-0 z-30 w-full max-w-[600px] bg-white px-5 py-3">
        {/* TODO 추후 수정 예정 */}
        <ProductActionButtons
          onCartClick={async () => {
            // 옵션 선택 여부 확인
            if (!allOptionsSelected) {
              alert('사이즈, 색상 모두 선택 해주세요.');
              return;
            }

            // 수량 확인
            if (quantity < 1) {
              alert('수량을 1개 이상 선택해주세요!');
              return;
            }

            setLoading(true);
            try {
              // 선택된 옵션 정리
              const cleanOptions = Object.fromEntries(
                Object.entries(selectedOptions).filter(([_, v]) => !!v),
              );

              // API 요청 데이터 구성
              const body = {
                product_id: Number(item.id),
                quantity,
                ...cleanOptions, // ex: size: "270", color: "red"
              };

              // API 호출
              await fetchAddToCart(body);

              // 장바구니 갱신
              const updatedCart = await fetchCartList();
              setCartItems(
                (updatedCart.item as any[])?.map(item => ({
                  _id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                  mainImages: item.mainImages,
                })) ?? [],
              );

              alert('장바구니에 상품이 추가되었습니다!');
              setIsBottomSheetOpen(false);
            } catch (error: unknown) {
              if (error instanceof Error) {
                console.error('장바구니 추가 중 오류:', error);
                alert(error.message || '장바구니 추가에 실패했습니다.');
              } else {
                console.error('알 수 없는 오류 발생:', error);
                alert('장바구니 추가에 실패했습니다.');
              }
            } finally {
              setLoading(false);
            }
          }}
          onBuyNowClick={() => {
            alert('구매하기 기능은 아직 구현되지 않았습니다.');
          }}
          product={{
            id: item.id,
            name: item.name,
            price: item.price,
            productImg: item.productImg || '',
          }}
          options={options.map(opt => ({
            id: opt.name,
            name: opt.name,
            price: item.price,
          }))}
        />
      </div>

      {/* 바텀시트 옵션/수량/담기버튼 */}
      {isBottomSheetOpen && (
        <div className="fixed bottom-[78px] z-20 flex w-full max-w-[600px] flex-col rounded-t-[16px] bg-white shadow-lg">
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]" />
          </div>

          {/* 옵션 선택 UI (상품 옵션 있을 때만) */}
          {hasOptions &&
            options.map(opt => (
              <div key={opt.name} className="bg-white px-5 pt-3.5">
                <OptionSelector
                  name={opt.name}
                  options={opt.values}
                  selectedOption={selectedOptions[opt.name] || ''}
                  onSelect={value => handleOptionChange(opt.name, value)}
                />
              </div>
            ))}

          {/* 수량, 총 금액, 담기버튼 (옵션 모두 선택 후) */}
          {allOptionsSelected && (
            <>
              <ProductQuantitySelector
                selectedOption={
                  hasOptions
                    ? Object.entries(selectedOptions)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(', ')
                    : item.name
                }
                quantity={quantity}
                onIncrease={() => setQuantity(prev => prev + 1)}
                onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                price={item.price}
                originalPrice={originalPrice}
                item={item}
              />
              <TotalPrice
                quantity={quantity}
                price={item.price}
                originalPrice={originalPrice}
              />
            </>
          )}

          {/* 옵션이 없는 상품일 때 수량/합계 바로 노출 */}
          {!hasOptions && (
            <>
              <ProductQuantitySelector
                selectedOption={item.name}
                quantity={quantity}
                onIncrease={() => setQuantity(prev => prev + 1)}
                onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                price={item.price}
                originalPrice={originalPrice}
                item={item}
              />
              <TotalPrice
                quantity={quantity}
                price={item.price}
                originalPrice={originalPrice}
              />
            </>
          )}

          {/* 장바구니 담기 버튼 */}
          <div className="px-5 py-3">
            <button
              onClick={handleAddToCart}
              disabled={loading || !allOptionsSelected}
              className={`w-full rounded py-3 text-lg font-semibold text-white ${
                loading || !allOptionsSelected
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {loading ? '추가 중...' : '장바구니 담기'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

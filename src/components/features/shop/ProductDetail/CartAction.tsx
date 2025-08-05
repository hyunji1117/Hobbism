'use client';

import { useState, useEffect } from 'react';
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // 옵션 변경 핸들러
  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  // 장바구니 목록 가져오기
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await fetchCartList();
        setCartCount(res.item.length); // 장바구니 목록 개수 업데이트
      } catch (error) {
        console.error('장바구니 목록 불러오기 실패:', error);
      }
    };

    fetchCartData();
  }, []);

  const handleAddToCart = async () => {
    try {
      const response = await fetchAddToCart({
        product_id: Number(item.id),
        quantity,
        size: selectedOptions.size,
        color: selectedOptions.color,
      });

      // 장바구니 목록 다시 가져오기
      const res = await fetchCartList();
      setCartCount(res.item.length); // 장바구니 목록 개수 업데이트

      alert('상품이 장바구니에 추가되었습니다!');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가에 실패했습니다.');
    }
  };

  return (
    <>
      {/* 바텀시트 옵션/수량/담기버튼 */}
      {isBottomSheetOpen && (
        <div className="fixed bottom-[78px] z-20 flex w-full max-w-[600px] flex-col rounded-t-[16px] bg-white shadow-lg">
          <div className="flex justify-center">
            <div className="mt-2.5 h-[4px] w-[109px] rounded-full bg-[#3D3D3D]" />
          </div>

          {options.map(opt => (
            <div key={opt.name}>
              <label>{opt.name}</label>
              <select
                value={selectedOptions[opt.name] || ''}
                onChange={e => handleOptionChange(opt.name, e.target.value)}
              >
                {opt.values.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* 수량 선택 */}
          <div>
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>

          {/* 장바구니 추가 버튼 */}
          <button onClick={handleAddToCart}>장바구니에 추가</button>
        </div>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import {
  fetchCartList,
  fetchDeleteAllCarts,
} from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';
import { CartItemCard } from '@/components/features/shopping-cart/CartItemCard';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Track selected items
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart items on component mount
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCartList(1, 10);
        setCartItems(
          data.item.map(item => ({
            ...item,
            product: {
              _id: item.product._id,
              image: item.product.image ?? [],
              name: item.product.name,
              path: item.product.image.path,
              price: item.product.price,
              quantity: item.product.quantity,
            },
            isChecked: false,
          })),
        );
      } catch (err) {
        console.error('장바구니 데이터를 가져오는 중 오류 발생:', err);
        setError('장바구니 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  if (isLoading) return <p className="py-10 text-center">로딩 중...</p>;
  if (error) return <p className="py-10 text-center text-red-500">{error}</p>;
  if (cartItems.length === 0) {
    return <p className="py-10 text-center">장바구니가 비어 있습니다.</p>;
  }

  // Handle "전체 선택" button click
  const handleAllSelect = () => {
    const newIsAllChecked = !isAllChecked; // Toggle the current state
    setIsAllChecked(newIsAllChecked); // Update the "전체 선택" state

    // Update all items' `isChecked` state and manage selectedItems
    const updatedCartItems = cartItems.map(item => ({
      ...item,
      isChecked: newIsAllChecked,
    }));

    setCartItems(updatedCartItems);

    // Update selectedItems based on the new state
    if (newIsAllChecked) {
      const allSelectedItems = updatedCartItems.map(item => item.product._id);
      setSelectedItems(allSelectedItems); // Add all items to selectedItems
    } else {
      setSelectedItems([]); // Clear selectedItems when deselecting all
    }
  };

  // Handle individual item selection
  const handleItemCheck = (id: number, checked: boolean) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === id ? { ...item, isChecked: checked } : item,
      ),
    );

    // Update selectedItems based on individual selection
    setSelectedItems(prev =>
      checked ? [...prev, id] : prev.filter(itemId => itemId !== id),
    );
  };

  // Handle "선택삭제" button click
  const handleSelectedRemove = async () => {
    if (selectedItems.length === 0) {
      alert('삭제할 상품을 선택해주세요.');
      return;
    }

    try {
      // API call to delete selected items
      await fetchDeleteAllCarts(selectedItems); // API 호출

      // Update state after deletion
      setCartItems(prev =>
        prev.filter(item => !selectedItems.includes(item.product._id)),
      );
      setSelectedItems([]); // Clear selectedItems after deletion
      setIsAllChecked(false);
      alert('선택된 상품이 삭제되었습니다.');
    } catch (err) {
      console.error('상품 삭제 중 오류 발생:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col">
      {/* 전체 선택 */}
      <div className="relative flex">
        <button
          onClick={handleAllSelect}
          aria-label={isAllChecked ? '전체 상품 선택 해제' : '전체 상품 선택'}
          className="absolute top-3.5"
        >
          {isAllChecked ? (
            <Image
              src="/check-on.svg"
              alt="전체 선택 설정 버튼"
              width={20}
              height={20}
              className="ml-5"
            />
          ) : (
            <Image
              src="/check-off.svg"
              alt="전체 선택 해제 버튼"
              width={20}
              height={20}
              className="ml-5"
            />
          )}
        </button>
        <span className="relative top-3 left-14 text-lg leading-6 font-semibold">
          전체 선택
        </span>
        <button
          className="absolute top-3 right-5 text-[#FE5088]"
          onClick={handleSelectedRemove}
        >
          선택삭제
        </button>
      </div>
      <hr className="my-6" />

      {/* 장바구니에 담긴 상품 리스트 */}
      <div>
        {cartItems.map((item, index) => (
          <CartItemCard
            key={`${item.product._id}-${item.product.name}-${index}`}
            id={item.product._id}
            path={item.product.image.path}
            name={item.product.name}
            price={item.product.price}
            quantity={item.product.quantity}
            isChecked={item.isChecked}
            onCheck={handleItemCheck}
          />
        ))}
      </div>

      {/* 결제 정보 */}
      <div className="my-6 ml-4 flex flex-col gap-y-4">
        <div>
          <span className="text-[#4B5563]">총 상품금액</span>
          <span className="absolute right-4 font-medium">192,000원</span>
        </div>
        <div>
          <span className="text-[#4B5563]">배송비</span>
          <span className="absolute right-4">무료</span>
        </div>
        <div>
          <span className="text-lg leading-6 font-semibold">총 결제금액</span>
          <span className="absolute right-4 text-lg leading-6 font-semibold text-[#6E67DA]">
            192,000원
          </span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="relative top-3 text-center">
        <button className="h-[3.5rem] w-[21.875rem] cursor-pointer rounded-md bg-[#FE508B] text-xl font-semibold text-white hover:bg-[#e6457b]">
          결제하기
        </button>
      </div>
    </div>
  );
}

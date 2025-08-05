'use client';

import {
  fetchUpdateCartItemQuantity,
  deleteCartItem,
} from '@/data/functions/CartFetch.client';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface CardItemCardProps {
  id: number;
  path: string;
  name: string;
  price: number;
  quantity: number;
  isChecked?: boolean;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onCheck?: (id: number, checked: boolean) => void;
  cartId: number;
}

export function CartItemCard({
  cartId,
  id,
  path,
  name,
  price,
  quantity,
  isChecked = false,
  onQuantityChange,
  onRemove,
  onCheck,
}: CardItemCardProps) {
  // 로컬 상태 관리
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [localChecked, setLocalChecked] = useState(isChecked);
  const [isDeleted, setIsDeleted] = useState(false);

  // 개별 체크박스 상태 변경
  const handleCheckedChange = () => {
    const newChecked = !localChecked;
    setLocalChecked(newChecked);
    onCheck?.(id, newChecked); // 부모 컴포넌트에 체크 상태 전달
  };

  // 수량 증가
  const handleUp = async () => {
    if (localQuantity < 99) {
      const newQuantity = localQuantity + 1;
      try {
        await fetchUpdateCartItemQuantity(cartId, newQuantity);
        setLocalQuantity(newQuantity);
        onQuantityChange?.(cartId, newQuantity);
      } catch (error) {
        console.error('수량 증가 중 오류 발생:', error);
        alert('수량 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 수량 감소
  const handleDown = async () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      try {
        await fetchUpdateCartItemQuantity(cartId, newQuantity);
        setLocalQuantity(newQuantity);
        onQuantityChange?.(cartId, newQuantity);
      } catch (error) {
        console.error('수량 감소 중 오류 발생:', error);
        alert('수량 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 한건 상품 삭제
  const handleRemove = async () => {
    try {
      await deleteCartItem(cartId); // API 호출
      setIsDeleted(true); // 삭제 상태로 변경
      onRemove?.(cartId); // 부모 컴포넌트에 삭제된 상품 ID 전달
      alert('삭제 되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isDeleted) {
    return null; // 삭제된 상태라면 UI에서 제거
  }

  return (
    <>
      <div className="relative mx-auto h-[6.5rem] w-[21.875rem]">
        {/* 체크박스 */}
        <div className="mt-1">
          <button
            className="cursor-pointer"
            onClick={handleCheckedChange}
            aria-label={localChecked ? '상품 선택 해제' : '상품 선택'}
          >
            {localChecked ? (
              <Image
                src="/check-on.svg"
                alt="check icon"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/check-off.svg"
                alt="uncheck icon"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>

        {/* 상품 이미지 */}
        <div className="relative bottom-8 ml-8">
          <Image
            src={path || ''}
            alt={name}
            className="rounded-lg border border-[#ECEDEE]"
            width={80}
            height={80}
          />
        </div>

        {/* 상품 정보 */}
        <div className="absolute top-0 left-34">
          <p className="text-lg leading-6 font-semibold">
            {name?.length > 10 ? `${name.slice(0, 10)}...` : name}
          </p>
          <p>{price.toLocaleString()}원</p>
        </div>

        {/* 수량 변경 */}
        <div className="absolute top-14 left-34">
          <button
            className="relative bottom-1 cursor-pointer"
            onClick={handleDown}
          >
            <div className="flex size-7 items-center justify-center rounded-full border border-[#ECEDEE]">
              <Minus size={20} color="#787878" strokeWidth={1.5} />
            </div>
          </button>
          <span className="relative bottom-2 px-6 text-[#787878]">
            {localQuantity}
          </span>
          <button
            className="relative bottom-1 cursor-pointer"
            onClick={handleUp}
          >
            <div className="flex size-7 items-center justify-center rounded-full border border-[#ECEDEE]">
              <Plus size={20} color="#787878" strokeWidth={1.5} />
            </div>
          </button>
        </div>

        {/* 삭제 아이콘 */}
        <div className="absolute top-2 right-0">
          <button className="cursor-pointer" onClick={handleRemove}>
            <X size={18} strokeWidth={1} />
          </button>
        </div>
      </div>
      <hr className="mx-7 mb-7" />
    </>
  );
}

//        장바구니 인터렉션 처리 컴포넌트         //
'use client';

import {
  fetchUpdateCartItemQuantity,
  deleteCartItem,
  fetchDeleteAllCarts,
} from '@/data/functions/CartFetch.client';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export interface CartItemCardProps {
  id: number;
  path: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  size?: string;
  color?: string;
  selectedOption?: string;
  isChecked?: boolean;
  isSelected?: boolean;
  isAllChecked?: boolean;
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
  selectedSize,
  selectedColor,
  size,
  color,
  selectedOption,
  isChecked = false,
  isSelected = true,
  isAllChecked = false,
  onQuantityChange,
  onRemove,
  onCheck,
}: CartItemCardProps) {
  // 로컬 상태 관리
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [localChecked, setLocalChecked] = useState(isChecked);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSelectedState, setIsSelected] = useState(isSelected);

  // 개별 체크박스 상태 변경
  const handleCheckedChange = () => {
    const newChecked = !localChecked;
    setLocalChecked(newChecked);
    onCheck?.(id, newChecked);
  };

  //        수량 증가         //
  const handleUp = async () => {
    if (localQuantity < 99) {
      const newQuantity = localQuantity + 1;
      try {
        await fetchUpdateCartItemQuantity(cartId, newQuantity);
        setLocalQuantity(newQuantity);
        onQuantityChange?.(cartId, newQuantity);
      } catch (error) {
        console.error('수량 증가 중 오류 발생:', error);
        toast.error('수량 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  //        수량 감소       //
  const handleDown = async () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      try {
        await fetchUpdateCartItemQuantity(cartId, newQuantity);
        setLocalQuantity(newQuantity);
        onQuantityChange?.(cartId, newQuantity);
      } catch (error) {
        console.error('수량 감소 중 오류 발생:', error);
        toast.error('수량 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  //        한건 상품 삭제        //
  const handleRemove = async () => {
    try {
      await deleteCartItem(cartId);
      setIsDeleted(true);
      onRemove?.(cartId);
      toast.success('선택하신 상품이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  //        여러건 상품 삭제        //
  const handleRemoveAll = async () => {
    try {
      await fetchDeleteAllCarts([cartId]);
      setIsSelected(true);
      onRemove?.(cartId);
      toast.success('상품이 선택되었습니다.');
    } catch (error) {
      console.error('상품 선택 실패:', error);
      toast.error('상품이 선택되지 않았습니다.');
    }
  };

  //       전체 선택 상태 업데이트**        //
  useEffect(() => {
    setLocalChecked(isAllChecked);
  }, [isAllChecked]);

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[500px] min-w-[250px] items-start gap-3 py-3">
        {/* 체크박스 */}
        <div className="flex h-[80px] flex-shrink-0 items-center justify-center px-1">
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

        {/* 상품 이미지 + 상품 정보 및 옵션(세로 배치) */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* 상단: 이미지+정보 가로배치 */}
          <div className="flex w-full flex-row gap-2">
            {/* 상품 이미지 */}
            <Link
              href={`/shop/${id}`}
              prefetch={true}
              className="flex h-[80px] flex-shrink-0 items-center"
            >
              <Image
                src={path || ''}
                alt={name}
                className="aspect-square rounded-lg border border-[#ECEDEE]"
                width={80}
                height={80}
              />
            </Link>

            {/* 상품 정보(이름, 금액, 수량 등) */}
            <div className="relative flex min-w-0 flex-grow flex-col px-4">
              {/* 삭제 버튼 - 상품명 오른쪽 끝 */}
              <button
                className="absolute top-0 right-0 cursor-pointer"
                onClick={handleRemove}
              >
                <X size={16} strokeWidth={1} />
              </button>
              <Link href={`/shop/{id}`} prefetch={true}>
                <p className="max-w-full truncate pr-6 text-[18px] font-semibold">
                  {name}
                </p>
              </Link>
              <span className="mt-1 text-[16px] text-[#787878]">
                {price.toLocaleString()}원
              </span>
              <div className="mt-2 flex items-center">
                <button className="cursor-pointer" onClick={handleDown}>
                  <div className="flex size-6 items-center justify-center rounded-full border border-[#ECEDEE]">
                    <Minus size={14} color="#787878" strokeWidth={1.5} />
                  </div>
                </button>
                <span className="px-5 text-[#787878]">{localQuantity}</span>
                <button className="cursor-pointer" onClick={handleUp}>
                  <div className="flex size-6 items-center justify-center rounded-full border border-[#ECEDEE]">
                    <Plus size={14} color="#787878" strokeWidth={1.5} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 옵션 값(이미지의 왼쪽 라인에 맞게 항상 정렬) */}
          {(size || color) && (
            <div className="mt-2 flex h-[35.5px] max-w-[440px] items-center rounded-[2px] bg-[#EAEAEA] pl-4 text-sm text-[#787878]">
              {size && !color && <span>[SIZE]&nbsp;{`${size}`}</span>}
              {color && !size && <span>[COLOR]&nbsp;{`${color}`}</span>}
              {size && color && (
                <>
                  <span>[SIZE]&nbsp;{`${size}`}</span>
                  &nbsp;/&nbsp;
                  <span>[COLOR]&nbsp;{`${color}`}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <hr className="mx-7 mb-5" />
    </>
  );
}

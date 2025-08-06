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
    onCheck?.(id, newChecked); // 부모 컴포넌트에 체크 상태 전달
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
    console.log();
    try {
      await deleteCartItem(cartId); // API 호출
      setIsDeleted(true); // 삭제 상태로 변경
      onRemove?.(cartId); // 부모 컴포넌트에 삭제된 상품 ID 전달
      toast.success('선택하신 상품이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  //        여러건 상품 삭제        //
  const handleRemoveAll = async () => {
    try {
      await fetchDeleteAllCarts([cartId]); // API 호출
      setIsSelected(true); // 선택 상태로 변경
      onRemove?.(cartId); // 부모 컴포넌트에 삭제된 상품 ID 전달
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
      <div className="relative mx-auto h-[6.25rem] w-[21.875rem]">
        {/* 체크박스 */}
        <div className="mt-1">
          <button
            className="mt-1.5 cursor-pointer"
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

        <Link href={`/shop/${id}`} prefetch={true}>
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
          <div className="absolute top-0 left-32">
            <p className="text-lg leading-6 font-semibold">
              {name?.length > 10 ? `${name.slice(0, 12)}...` : name}
            </p>
            <p>{price.toLocaleString()}원</p>
          </div>

          {/* 수량 변경 */}
          <div className="absolute top-14 left-32">
            <button
              className="relative top-0 cursor-pointer"
              onClick={handleDown}
            >
              <div className="flex size-7 items-center justify-center rounded-full border border-[#ECEDEE]">
                <Minus size={15} color="#787878" strokeWidth={1.5} />
              </div>
            </button>
            <span className="relative bottom-[1.5px] px-6 text-[#787878]">
              {localQuantity}
            </span>
            <button
              className="relative bottom-0 cursor-pointer"
              onClick={handleUp}
            >
              <div className="flex size-7 items-center justify-center rounded-full border border-[#ECEDEE]">
                <Plus size={15} color="#787878" strokeWidth={1.5} />
              </div>
            </button>
          </div>
        </Link>

        {/* 삭제 아이콘 */}
        <div className="absolute top-1 right-0">
          <button className="cursor-pointer" onClick={handleRemove}>
            <X size={18} strokeWidth={1} />
          </button>
        </div>
      </div>
      {/* 선택된 옵션 표시 */}
      {(size || color) && (
        <div className="relative mx-auto mb-6 flex h-[35.5px] w-[290px] items-center justify-start rounded-[2px] bg-[#EAEAEA] pl-4 text-sm text-[#787878]">
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

      <hr className="mx-7 mb-5" />
    </>
  );
}

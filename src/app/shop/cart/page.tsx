//        장바구니 페이지 컴포넌트         //
'use client';

import { useEffect, useState } from 'react';
import {
  fetchCartList,
  fetchUpdateCartItemQuantity,
  fetchDeleteAllCarts,
} from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';
import CartList from '@/components/features/shopping-cart/CartList';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';
import { usePurchaseStore } from '@/store/order.store';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // 장바구니 데이터 로드
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCartList(1, 10);
        setCartItems(
          data.item.map(item => ({
            ...item,
            isChecked: false,
            selectedOption: item.selectedOption,
          })),
        );
      } catch (err) {
        console.error('장바구니 데이터를 가져오는 중 오류 발생:', err);
        setErrorMessage('장바구니 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // 전체 선택 토글 핸들러
  const handleCheckAll = async (checked: boolean) => {
    setIsAllChecked(checked); // 전체 선택 상태 업데이트
    setCartItems(prev =>
      prev.map(item => ({
        ...item,
        isChecked: checked,
      })),
    );
  };

  // 전체 선택 버튼 핸들러
  const handleAllSelect = () => {
    const newCheckedState = !isAllChecked;
    handleCheckAll(newCheckedState);
  };

  // 총 결제 금액 계산
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems
        .filter(item => item.isChecked)
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  // 개별 상품 체크 핸들러
  const handleCheckItem = (id: number, checked: boolean) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === id ? { ...item, isChecked: checked } : item,
      ),
    );
    setIsAllChecked(cartItems.every(item => item.isChecked));
  };

  // 수량 변경 핸들러
  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      const updatedItem = await fetchUpdateCartItemQuantity(id, quantity);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product._id === id
            ? { ...item, quantity: updatedItem.data.quantity }
            : item,
        ),
      );
    } catch (error) {
      console.error('수량 변경 중 오류 발생:', error);
    }
  };

  const handleRemoveAll = async () => {
    const selectedItems = cartItems.filter(item => item.isChecked);
    const selectedIds = selectedItems.map(item => item._id);

    if (selectedIds.length === 0) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      await fetchDeleteAllCarts(selectedIds);
      setCartItems(prevItems =>
        prevItems.filter(item => !selectedIds.includes(item._id)),
      );
      toast.success('선택된 상품이 삭제되었습니다.');
    } catch (error) {
      console.error('여러 건 삭제 중 오류 발생:', error);
      toast.error('여러 건 삭제에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handelAddBuy = () => {
    const selectedItems = cartItems.filter(item => item.isChecked);
    const purchaseData = selectedItems.map(item => ({
      cartId: item._id,
      id: item.product._id.toString(),
      name: item.product.name,
      originalPrice: item.product.extra.originalPrice,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      productImg: item.product.image.path || '',
    }));

    if (selectedItems.length < 1) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

    setIsLoading(true);

    console.log('purchaseData', purchaseData);

    // 구매 데이터 저장 및 페이지 이동
    usePurchaseStore.getState().setPurchaseData(purchaseData);
    router.push(`/shop/purchase`);
  };

  if (isLoading) return <Loading />;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="flex flex-col px-4">
      <hr className="mt-10" />
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
              alt="전체 선택 설정 버튼"
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
          className="absolute top-3 right-5 text-[#F05656]"
          onClick={handleRemoveAll}
        >
          선택 삭제
        </button>
      </div>
      <hr className="my-6" />

      {/* 장바구니에 담긴 상품 리스트 */}
      <CartList
        cartItems={cartItems}
        onCheckItem={handleCheckItem}
        onQuantityChange={handleQuantityChange}
        isAllChecked={isAllChecked}
        onCheckAll={handleCheckAll}
      />

      {/* 결제 정보 */}
      <div className="mx-4 my-6 flex flex-col gap-y-4">
        <div className="flex justify-between">
          <span className="text-[#4B5563]">총 상품금액</span>
          <span className="right-4 font-medium">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4B5563]">배송비</span>
          <span className="right-4">무료</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg leading-6 font-semibold">총 결제금액</span>
          <span className="right-4 text-lg leading-6 font-semibold text-[#F05656]">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="top-3 px-4 py-3 text-center">
        <button
          className="mb-50 h-[3.5rem] w-full max-w-[21.875rem] cursor-pointer rounded-md bg-[#4B5563] text-xl font-semibold text-white hover:bg-[#2C2F33]"
          onClick={handelAddBuy}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

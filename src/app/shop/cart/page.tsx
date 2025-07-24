'use client';

import CartItemCard from '@/components/features/shopping-cart/CartItemCard';
import {
  Banknote,
  ChevronLeft,
  CreditCard,
  MapPin,
  WalletCards,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function CartPage() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [ispaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // 임시로 넣어놓은 데이터
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productImg: '',
      name: '상품 제목을 입력해주세요.',
      price: 20000,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 2,
      productImg: '',
      name: '상품 제목을 입력해주세요.',
      price: 15000,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 3,
      productImg: '',
      name: '상품 제목을 입력해주세요.',
      price: 30000,
      quantity: 1,
      isChecked: false,
    },
  ]);

  // 전체 상품 선택/해제
  const handleAllSelect = () => {
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);

    const updatedItems = cartItems.map(item => ({
      ...item,
      isChecked: newCheckedState,
    }));

    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  // 개별 상품 선택/해제
  const handleItemCheck = (id: number, checked: boolean) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, isChecked: checked } : item,
    );

    const allChecked = updatedItems.every(item => item.isChecked);
    setIsAllChecked(allChecked);
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  // 선택된 상품을 선택삭제를 통해 제거
  const handleSelectedRemove = () => {
    const selectedItems = cartItems.filter(item => item.isChecked);

    if (selectedItems.length === 0) {
      alert('삭제할 상품을 선택해주세요.');
      return;
    } else {
      const updatedItems = cartItems.filter(item => !item.isChecked);
      setCartItems(updatedItems);
      setIsAllChecked(false);
      updateTotalPrice(updatedItems);
    }
  };

  // 개별 상품 삭제
  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  // 상품 수량 변경
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  // 총 상품금액 업데이트
  const updateTotalPrice = (items: typeof cartItems) => {
    const total = items.reduce((acc, item) => {
      if (item.isChecked) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  };

  const handleOpenPaymentSheet = () => {
    setIsPaymentSheetOpen(true);
  };

  const handleClosePaymentSheet = () => {
    setIsPaymentSheetOpen(false);
  };

  const handlePayment = () => {
    alert('결제가 완료되었습니다.');
    setIsPaymentSheetOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* 상단 */}
      {/* <div className="mt-10">
        <Link href="/shop" className="relative top-7 left-4" prefetch>
          <ChevronLeft size={24} />
        </Link>
        <p className="text-center text-lg leading-6 font-semibold">장바구니</p>
      </div>
      <hr className="mt-10" /> */}

      {/* 전체 선택 */}
      <div className="relative flex">
        <button
          onClick={handleAllSelect}
          aria-label={isAllChecked ? '전체 상품 선택' : '전체 상품 선택 해제'}
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
          className="absolute top-3 right-5 text-[#FE5088]"
          onClick={handleSelectedRemove}
        >
          선택삭제
        </button>
      </div>
      <hr className="my-6" />

      {/* 장바구니에 담긴 상품 리스트 */}
      <div>
        {cartItems.map(item => (
          <CartItemCard
            key={item.id}
            id={item.id}
            productImg={item.productImg}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            isChecked={item.isChecked}
            onCheck={handleItemCheck}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

      {/* 결제 정보 */}
      <div className="my-6 ml-4 flex flex-col gap-y-4">
        <div>
          <span className="text-[#4B5563]">총 상품금액</span>
          <span className="absolute right-4 font-medium">{totalPrice}원</span>
        </div>
        <div>
          <span className="text-[#4B5563]">배송비</span>
          <span className="absolute right-4">무료</span>
        </div>
        <div>
          <span className="text-lg leading-6 font-semibold">총 결제금액</span>
          <span className="absolute right-4 text-lg leading-6 font-semibold text-[#6E67DA]">
            {totalPrice}원
          </span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="relative top-3 text-center">
        <button
          className="h-[3.5rem] w-[21.875rem] cursor-pointer rounded-md bg-[#FE508B] text-xl font-semibold text-white hover:bg-[#e6457b]"
          onClick={handleOpenPaymentSheet}
        >
          결제하기
        </button>
      </div>

      {ispaymentSheetOpen && (
        <div className="fixed inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[600px] rounded-t-3xl bg-white">
            {/* 바텀시트 헤더 */}
            <div className="flex items-center justify-between rounded-t-2xl border-t-2 px-6 py-6">
              <h2 className="text-lg leading-6 font-semibold">결제하기</h2>
              <button onClick={handleClosePaymentSheet} className="p-1">
                <X size={18} />
              </button>
            </div>
            <hr />

            <div className="max-h-[60vh] px-6 py-4">
              {/* 배송지 */}
              <div className="mb-6">
                <h3 className="mb-3.5 text-lg leading-6 font-semibold">
                  배송지
                </h3>
                <div className="flex items-start">
                  <MapPin />
                  <div className="flex-1">
                    <p className="pl-2.5 font-semibold">홍길동</p>
                    <p className="mt-1 pl-2.5 text-sm text-[#4B5563]">
                      서울특별시 강남구 테헤란로 123
                    </p>
                    <p className="pl-2.5 text-sm text-[#4B5563]">
                      삼성아파트 111호 1001호
                    </p>
                  </div>
                </div>
              </div>
              <hr className="-mx-6" />

              {/* 결제수단 */}
              <div className="mt-4">
                <h3 className="mb-4 text-lg font-bold">결제수단</h3>
                <div className="space-y-3">
                  {/* 신용카드 */}
                  <label className="flex items-center p-3">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-3 h-5 w-5"
                      defaultChecked
                    />
                    <div className="flex items-center">
                      <CreditCard />
                      <span className="pl-2.5">신용카드</span>
                    </div>
                  </label>

                  {/* 무통장입금 */}
                  <label className="flex items-center p-3">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-3 h-5 w-5"
                    />
                    <div className="flex items-center">
                      <Banknote />
                      <span className="pl-2.5">무통장입금</span>
                    </div>
                  </label>

                  {/* 간편결제 */}
                  <label className="flex items-center p-3">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-3 h-5 w-5"
                    />
                    <div className="flex items-center">
                      <WalletCards />
                      <span className="pl-2.5">간편결제</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* 결제 버튼 */}
            <div className="px-4 py-3 text-center">
              <button
                className="h-[3.5rem] w-[21.875rem] cursor-pointer rounded-md bg-[#FE508B] text-xl font-semibold text-white hover:bg-[#e6457b]"
                onClick={handlePayment}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartPage;

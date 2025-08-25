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
import Loading from '@/app/(main)/loading';
import { usePurchaseStore } from '@/store/order.store';
import { useRouter } from 'next/navigation';
import { useCartState } from '@/store/cartStore';
import { PaymentButton } from '@/components/common/PaymentButton';
import { CartSummary } from '@/components/features/shopping-cart/CartSummary';
import { CartSelectAll } from '@/components/features/shopping-cart/CartSelectAll';

// 로컬에서만 사용하는 확장된 CartItem 타입
interface ExtendedCartItem extends CartItem {
  isChecked: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Zustand state 사용
  const { refreshCartCount } = useCartState();

  // 장바구니 데이터 로드
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCartList(1, 10);

        const items = data.item.map(item => ({
          ...item,
          isChecked: false,
          selectedOption: item.selectedOption,
        }));

        setCartItems(items);
        // 전역 장바구니 개수 업데이트
        await refreshCartCount();
      } catch (err) {
        console.error('장바구니 데이터를 가져오는 중 오류 발생:', err);
        setErrorMessage('장바구니 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, [refreshCartCount]);

  // 전체 선택 버튼 핸들러
  const handleCheckAll = (checked: boolean) => {
    setIsAllChecked(checked);
    setCartItems(prev =>
      prev.map(item => ({
        ...item,
        isChecked: checked,
      })),
    );
  };

  // "전체 선택" 버튼 클릭 UI 이벤트 처리만 담당
  const handleAllSelect = () => {
    const newCheckedState = !isAllChecked;
    // 새로운 함수 호출로 변경
    handleCheckAll(newCheckedState);
  };

  // 총 결제 금액 계산: cartItems가 변경될 때마다 총 금액 자동 재계산
  useEffect(() => {
    const total = cartItems
      .filter(item => item.isChecked)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // 개별 상품 체크 핸들러
  // const handleCheckItem = (
  //   id: number,
  //   checked: boolean,
  //   color: string,
  //   size: string,
  // ) => {
  // const updatedItems = cartItems.map(item =>
  //   item.product._id === id && item.color === color && item.size === size
  //     ? { ...item, isChecked: checked }
  //     : item,
  // );

  //   setCartItems(updatedItems);

  //   // 전체 선택 상태를 업데이트할 때, 모든 체크박스가 선택된 경우에만 true로 설정
  //   if (checked) {
  //     setIsAllChecked(updatedItems.every(item => item.isChecked));
  //   }
  // };

  const handleCheckItem = (
    id: number,
    checked: boolean,
    color: string,
    size: string,
  ) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === id && item.color === color && item.size === size
          ? { ...item, isChecked: checked }
          : item,
      ),
    );

    // 전체 선택 상태 업데이트
    const updatedItems = cartItems.map(item =>
      item.product._id === id ? { ...item, isChecked: checked } : item,
    );
    setIsAllChecked(updatedItems.every(item => item.isChecked));
  };

  // 수량 변경 핸들러
  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      // API 호출
      await fetchUpdateCartItemQuantity(id, quantity);

      // 상태 업데이트
      setCartItems(prevItems =>
        prevItems.map(item =>
          // 장바구니 아이템 ID로 비교할 것!
          item._id === id ? { ...item, quantity: quantity } : item,
        ),
      );

      await refreshCartCount();
    } catch (error) {
      console.error('수량 변경 중 오류 발생:', error);
      toast.error('수량 변경에 실패했습니다.');
    }
  };

  // 선택된 상품 삭제
  const handleRemoveAll = async () => {
    const selectedItems = cartItems.filter(item => item.isChecked);
    const selectedIds = selectedItems
      .map(item => item._id)
      .filter((id): id is number => typeof id === 'number');

    if (selectedIds.length === 0) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      await fetchDeleteAllCarts(selectedIds);
      const remainingItems = cartItems.filter(
        item => !selectedIds.includes(item._id as number),
      );

      setCartItems(remainingItems);
      // 상품 삭제 후 전역 장바구니 개수 업데이트
      await refreshCartCount();

      toast.success('선택된 상품이 삭제되었습니다.');
    } catch (error) {
      console.error('여러 건 삭제 중 오류 발생:', error);
      toast.error('여러 건 삭제에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 구매하기
  const handleAddBuy = () => {
    const selectedItems = cartItems.filter(item => item.isChecked);

    if (selectedItems.length === 0) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

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

    setIsLoading(true);
    usePurchaseStore.getState().setPurchaseData(purchaseData);
    router.push('/shop/purchase');
  };

  if (isLoading) return <Loading />;
  if (errorMessage) return <p>{errorMessage}</p>;

  // 빈 장바구니 상태 처리
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4">
        <div className="p-12 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            장바구니에 담긴 상품이 없어요
          </h2>
          <p className="mb-8 text-lg text-gray-500">원하는 상품을 담아보세요</p>
          <button
            className="min-w-[120px] cursor-pointer rounded-[5px] bg-[#4B5563] px-2 py-2 text-[16px] font-semibold text-white transition-colors hover:bg-[#2c2f33]"
            onClick={() => router.push('/shop')}
          >
            상품 보러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4">
      <hr className="mt-10" />

      {/* 전체 선택 컴포넌트 */}
      <CartSelectAll
        isAllChecked={isAllChecked}
        onSelectAll={handleAllSelect}
        onRemoveSelected={handleRemoveAll}
      />

      <hr className="my-6" />

      {/* 장바구니에 담긴 상품 리스트 */}
      <CartList
        cartItems={cartItems}
        onCheckItem={handleCheckItem}
        onQuantityChange={handleQuantityChange}
        isAllChecked={isAllChecked}
        onCheckAll={handleCheckAll}
      />

      {/* 결제 정보 요약 */}
      <CartSummary totalPrice={totalPrice} />

      {/* 결제 버튼 - 공통 컴포넌트 사용 */}
      <div className="top-3 px-4 py-3 text-center">
        <PaymentButton
          amount={totalPrice}
          // {handlePayment}로 수정 예정
          onClick={handleAddBuy}
          variant="secondary"
          fullWidth
          style={{ maxWidth: '21.875rem', margin: '0 auto' }}
        />
      </div>
    </div>
  );
}

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
import toast from 'react-hot-toast';
import Loading from '@/app/(main)/loading';
import { usePurchaseStore } from '@/store/order.store';
import { useRouter } from 'next/navigation';
import { useCartState } from '@/store/cartStore';
import { PaymentButton } from '@/components/common/PaymentButton';
import { CartSummary } from '@/components/features/shopping-cart/CartSummary';
import { CartSelectAll } from '@/components/features/shopping-cart/CartSelectAll';
import { CartEmpty } from '@/components/features/shopping-cart/CartEmpty';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Zustand state 사용
  const { refreshCartCount } = useCartState();

  // 파생 상태들
  const isAllChecked =
    cartItems.length > 0 && selectedIds.size === cartItems.length;
  const selectedItems = cartItems.filter(item => selectedIds.has(item._id));
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // 장바구니 데이터 로드
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCartList(1, 10);

        setCartItems(data.item);
        // 기본적으로 모든 아이템 선택
        setSelectedIds(new Set(data.item.map(item => item._id)));

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

  // 전체 선택/해제 토글
  const handleToggleAll = () => {
    if (isAllChecked) {
      setSelectedIds(new Set()); // 모두 해제
    } else {
      setSelectedIds(new Set(cartItems.map(item => item._id))); // 모두 선택
    }
  };

  // 개별 상품 체크
  const handleCheckItem = (cartId: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(cartId)) {
      newSelected.delete(cartId);
    } else {
      newSelected.add(cartId);
    }
    setSelectedIds(newSelected);
  };

  // 수량 변경 핸들러
  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      await fetchUpdateCartItemQuantity(id, quantity);

      setCartItems(prevItems =>
        prevItems.map(item => (item._id === id ? { ...item, quantity } : item)),
      );

      await refreshCartCount();
    } catch (error) {
      console.error('수량 변경 중 오류 발생:', error);
      toast.error('수량 변경에 실패했습니다.');
    }
  };

  // 개별 상품 삭제 핸들러
  const handleRemoveItem = (cartId: number) => {
    setCartItems(prev => prev.filter(item => item._id !== cartId));

    // 선택 목록에서도 제거
    const newSelected = new Set(selectedIds);
    newSelected.delete(cartId);
    setSelectedIds(newSelected);

    refreshCartCount();
  };

  // 선택된 상품 삭제
  const handleSelectionRemove = async () => {
    const selectedIdArray = Array.from(selectedIds);

    if (selectedIdArray.length === 0) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      await fetchDeleteAllCarts(selectedIdArray);

      setCartItems(prev => prev.filter(item => !selectedIds.has(item._id)));
      setSelectedIds(new Set()); // 선택 초기화

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
  if (cartItems.length === 0) return <CartEmpty />;

  return (
    <div className="flex flex-col px-4">
      <hr className="mt-10" />

      <CartSelectAll
        isAllChecked={isAllChecked}
        onToggleAll={handleToggleAll}
        onSelectionRemove={handleSelectionRemove}
      />

      <hr className="my-6" />

      <CartList
        cartItems={cartItems}
        selectedIds={selectedIds}
        onCheckItem={handleCheckItem}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />

      <CartSummary totalPrice={totalPrice} />

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-3 text-center shadow-md">
        <PaymentButton
          amount={totalPrice}
          onClick={handleAddBuy}
          variant="secondary"
          fullWidth
          style={{ maxWidth: '21.875rem', margin: '0 auto' }}
        />
      </div>
    </div>
  );
}

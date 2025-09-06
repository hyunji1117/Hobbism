// components/features/shopping-cart/CartPageClient.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  fetchUpdateCartItemQuantity,
  fetchDeleteAllCarts,
} from '@/data/functions/CartFetch.client';
import { CartItem } from '@/types/cart';
import CartList from '@/components/features/shopping-cart/CartList';
import toast from 'react-hot-toast';
import { usePurchaseStore } from '@/store/order.store';
import { useCartState } from '@/store/cartStore';
import { PaymentButton } from '@/components/common/PaymentButton';
import { CartSummary } from '@/components/features/shopping-cart/CartSummary';
import { CartSelectAll } from '@/components/features/shopping-cart/CartSelectAll';

interface ExtendedCartItem extends CartItem {
  isChecked: boolean;
}

interface CartPageClientProps {
  initialCartItems: CartItem[];
  accessToken?: string;
}

export default function CartPageClient({
  initialCartItems,
  accessToken,
}: CartPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // URL 파라미터로 선택 상태 복원
  const selectedIdsFromUrl =
    searchParams.get('selected')?.split(',').map(Number) || [];

  // 초기 데이터로 상태 설정 (SSR 데이터 활용)
  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>(() =>
    initialCartItems.map(item => ({
      ...item,
      isChecked: selectedIdsFromUrl.includes(item._id),
      selectedOption: item.selectedOption || '',
    })),
  );

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Zustand
  const { refreshCartCount } = useCartState();

  // 컴포넌트 마운트 시 장바구니 개수 업데이트
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  // URL 파라미터 업데이트 (React 18 startTransition 활용)
  const updateUrlParams = (items: ExtendedCartItem[]) => {
    startTransition(() => {
      const selectedIds = items
        .filter(item => item.isChecked)
        .map(item => item._id)
        .join(',');

      const params = new URLSearchParams(searchParams);
      if (selectedIds) {
        params.set('selected', selectedIds);
      } else {
        params.delete('selected');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  // 전체 선택 상태 체크
  useEffect(() => {
    setIsAllChecked(
      cartItems.length > 0 && cartItems.every(item => item.isChecked),
    );
  }, [cartItems]);

  // 총 결제 금액 계산 (최적화: useMemo 대신 useEffect 사용)
  useEffect(() => {
    const total = cartItems
      .filter(item => item.isChecked)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // 전체 선택 핸들러
  const handleCheckAll = (checked: boolean) => {
    const updatedItems = cartItems.map(item => ({
      ...item,
      isChecked: checked,
    }));
    setCartItems(updatedItems);
    updateUrlParams(updatedItems);
  };

  const handleAllSelect = () => {
    handleCheckAll(!isAllChecked);
  };

  // 개별 체크
  const handleCheckItem = (
    id: number,
    checked: boolean,
    color: string,
    size: string,
  ) => {
    const updatedItems = cartItems.map(item =>
      item.product._id === id && item.color === color && item.size === size
        ? { ...item, isChecked: checked }
        : item,
    );
    setCartItems(updatedItems);
    updateUrlParams(updatedItems);
  };

  // 수량 변경 (Optimistic UI)
  const handleQuantityChange = async (id: number, quantity: number) => {
    // 즉시 UI 업데이트 (Optimistic)
    setCartItems(prevItems =>
      prevItems.map(item => (item._id === id ? { ...item, quantity } : item)),
    );

    try {
      await fetchUpdateCartItemQuantity(id, quantity);
      await refreshCartCount();
    } catch (error) {
      // 실패 시 롤백
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === id ? { ...item, quantity: item.quantity } : item,
        ),
      );
      toast.error('수량 변경에 실패했습니다.');
    }
  };

  // 선택 삭제
  const handleRemoveAll = async () => {
    const selectedItems = cartItems.filter(item => item.isChecked);
    const selectedIds = selectedItems
      .map(item => item._id)
      .filter((id): id is number => typeof id === 'number');

    if (selectedIds.length === 0) {
      toast.error('선택된 상품이 없습니다.');
      return;
    }

    setIsProcessing(true);
    try {
      await fetchDeleteAllCarts(selectedIds);

      const remainingItems = cartItems.filter(
        item => !selectedIds.includes(item._id as number),
      );

      setCartItems(remainingItems);
      updateUrlParams(remainingItems);
      await refreshCartCount();

      toast.success('선택된 상품이 삭제되었습니다.');
    } catch (error) {
      toast.error('삭제에 실패했습니다.');
    } finally {
      setIsProcessing(false);
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
      originalPrice: item.product.extra?.originalPrice || item.product.price,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size || '',
      color: item.color || '',
      productImg: item.product.image?.path || '',
    }));

    usePurchaseStore.getState().setPurchaseData(purchaseData);
    router.push('/shop/purchase');
  };

  return (
    <div className="flex flex-col px-4">
      <hr className="mt-10" />

      <CartSelectAll
        isAllChecked={isAllChecked}
        onSelectAll={handleAllSelect}
        onRemoveSelected={handleRemoveAll}
      />

      <hr className="my-6" />

      <CartList
        cartItems={cartItems}
        onCheckItem={handleCheckItem}
        onQuantityChange={handleQuantityChange}
        isAllChecked={isAllChecked}
        onCheckAll={handleCheckAll}
      />

      <CartSummary totalPrice={totalPrice} />

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-3 text-center shadow-md">
        <PaymentButton
          amount={totalPrice}
          onClick={handleAddBuy}
          variant="secondary"
          fullWidth
          disabled={isProcessing || isPending || totalPrice === 0}
          style={{ maxWidth: '21.875rem', margin: '0 auto' }}
        />
      </div>
    </div>
  );
}

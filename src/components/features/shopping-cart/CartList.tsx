//        장바구니에 추가된 상품 목록 렌더링 컴포넌트        //
import { CartItem } from '@/types/cart';
import { CartItemCard } from '@/components/features/shopping-cart/CartItemCard';
// import { useAuthStore } from '@/store/auth.store';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

interface CartListProps {
  cartItems: CartItem[];
  onCheckItem: (id: number, checked: boolean) => void;
  onQuantityChange: (id: number, quantity: number) => Promise<void>;
  isAllChecked: boolean;
  onCheckAll: (checked: boolean) => void;
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  onCheckItem,
  onQuantityChange,
  isAllChecked,
  onCheckAll,
}) => {
  return (
    <div>
      {cartItems.map(item => (
        <div key={item._id} className="mb-0">
          {/* <Link href={`/shop/${item.product._id}`} prefetch={true}> */}
          {/* 상품 상세 페이지로 이동 */}
          <CartItemCard
            cartId={item._id}
            id={item.product._id}
            path={item.product.image.path}
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
            size={item.size}
            color={item.color}
            selectedOption={item.selectedOption}
            isChecked={item.isChecked}
            onCheck={onCheckItem}
            onQuantityChange={onQuantityChange}
            isAllChecked={isAllChecked}
          />
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};
export default CartList;

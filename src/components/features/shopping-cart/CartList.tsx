//        장바구니에 추가된 상품 목록 렌더링 컴포넌트        //
import { CartItem } from '@/types/cart';
import { CartItemCard } from '@/components/features/shopping-cart/CartItemCard';

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
        </div>
      ))}
    </div>
  );
};
export default CartList;

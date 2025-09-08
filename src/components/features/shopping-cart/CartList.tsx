// CartList.tsx - 단순화된 버전
import { CartItem } from '@/types/cart';
import { CartItemCard } from '@/components/features/shopping-cart/CartItemCard';

interface CartListProps {
  cartItems: CartItem[];
  selectedIds: Set<number>;
  onCheckItem: (cartId: number) => void;
  onQuantityChange: (id: number, quantity: number) => Promise<void>;
  onRemoveItem?: (cartId: number) => void;
}

export const CartList: React.FC<CartListProps> = ({
  cartItems,
  selectedIds,
  onCheckItem,
  onQuantityChange,
  onRemoveItem,
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
            isChecked={selectedIds.has(item._id)}
            onCheck={() => onCheckItem(item._id)}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveItem}
          />
        </div>
      ))}
    </div>
  );
};

export default CartList;

//        장바구니에 추가된 상품 목록 렌더링 컴포넌트        //
// import Link from 'next/link';
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
        <div key={item.product._id} className="mb-4">
          {/* <Link href={`/product/${item.product._id}`} prefetch={true}> */}
          <a>
            <CartItemCard
              cartId={item._id}
              id={item.product._id}
              path={item.product.image.path}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              isChecked={item.isChecked}
              onCheck={onCheckItem}
              onQuantityChange={onQuantityChange}
              isAllChecked={isAllChecked}
            />
          </a>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default CartList;

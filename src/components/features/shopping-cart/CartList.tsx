//        장바구니에 추가된 상품 목록 렌더링 컴포넌트        //
import { CartItem } from '@/types/cart';
import { CartItemCard } from '@/components/features/shopping-cart/CartItemCard';
// import { useRouter } from 'next/navigation';

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
  // const router = useRouter();

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="p-12 text-center">
  //       <h2 className="mb-2 text-2xl font-bold text-gray-900">
  //         장바구니에 담긴 상품이 없어요
  //       </h2>
  //       <p className="mb-5 text-lg text-gray-500">원하는 상품을 담아보세요</p>
  //       <button
  //         className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
  //         onClick={() => router.push('/shop')}
  //       >
  //         상품 보러 가기
  //       </button>
  //     </div>
  //   );
  // }

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

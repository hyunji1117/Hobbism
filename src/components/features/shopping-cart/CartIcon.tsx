import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/features/shop/ProductDetail/CartContext';

export function CartIcon() {
  const { cartCount } = useCart();

  return (
    <div className="relative">
      <ShoppingCart />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </div>
  );
}

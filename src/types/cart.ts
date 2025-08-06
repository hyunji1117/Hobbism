// import { Product } from '@/types/product';

// 장바구니 상품 한 건 삭제
export interface ProductListRes {
  mainImages: {
    path: string;
  };
  item: {
    _id: number;
    name: string;
    quantity: number;
  };
  extra: {
    originalPrice: number;
  };
}

export interface CartItem {
  _id: number;
  product: {
    _id: number;
    image: {
      path: string;
    };
    name: string;
    price: number;
    quantity: number;
    size: string | number;
    color: string;
    extra: {
      originalPrice: number;
    };
  };
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  mainImages?: string[];
  isChecked: boolean;
  cartId?: number;
  selectedOption?: string;
}

// CartItemCard 컴포넌트
export interface CardItemCardProps {
  id: number;
  mainImages: { path: string }[];
  name: string;
  price: number;
  quantity: number;
  isChecked?: boolean;
  isAllChecked?: boolean;
  onQuantityChange?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
  onCheck?: (id: number, checked: boolean) => void;
}

// 장바구니 목록 죄회
export interface CartListRes {
  ok: number;
  item: CartItem[];
}

// 장바구니 상품 여러건 삭제
export interface DeleteCartsRes {
  ok: number;
  item: CartItem[];
}

// 장바구니에 상품 추가
export interface AddToCartRes {
  mainImages: {
    path: string;
  };
  item: {
    _id: number;
    name: string;
    quantity: number;
  };
  extra: {
    originalPrice: number;
  };
}

// 장바구니 상품 수량 수정
export interface CartQuantityUpdateRes {
  ok: number;
  item: {
    quantity: number;
  };
  data: {
    quantity: number;
  };
}

interface RawCartItem {
  item: {
    _id: number;
    name: string;
    quantity: number;
    buyQuantity: number;
    mainImages: { path: string }[];
    extra: {
      originalPrice: number;
      options: {
        size: number[] | string[];
        color: string[];
      };
    };
  };
}

export type CartContextType = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
};

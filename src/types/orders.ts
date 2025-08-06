import { Product } from '@/types/product';

export type OrderProductType = Product & {
  _id: number;
  quantity: 1;
  name: string;
  image: {
    path: string;
    name: string;
  };
  size?: number | string;
  color?: string;
  price: number;
  originalPrice?: number;
  cost?: OrderedCost;
  user_id?: number;
};

export interface OrderedUser {
  name: string;
  phone: string;
}

export interface OrderedAddress {
  address: string;
  detailAddress: string;
  postcode: string;
}

export interface OrderedCost {
  products: number;
  discount: {
    products: number;
  };
  total: number;
}

// API 서버의 구매 상세 조회 응답
export interface OrderInfoRes {
  ok: 0 | 1;
  item: {
    _id: number;
    products: OrderProductType[];
    cost: OrderedCost;
    user: OrderedUser;
    address: OrderedAddress;
    selectedPayment: string;
    createdAt: string;
  };
}

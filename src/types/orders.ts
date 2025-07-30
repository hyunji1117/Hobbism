import { Product } from '@/types/product';

export type OrderProductType = Product & {
  _id: number;
  quantity: 1;
  name: string;
  image: {
    path: string;
    name: string;
  };
  price: number;
};

export type OrderOptions = {
  _id: number;
  extra: {
    size?: number;
    color?: string;
  };
};

// API 서버의 구매 상세 조회 응답
export interface OrderInfoRes {
  ok: 0 | 1;
  item: {
    _id: number;
    products: OrderProductType[];
    cost: {
      products: number;
      discount: {
        products: number;
      };
      total: number;
    };
    options?: OrderOptions[];
  };
}

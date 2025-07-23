// 상품 한 건의 메인 이미지
export interface ImageFiles {
  path: string;
  name: string;
  originalname: string;
}

// 상품 한 건
export interface Product {
  _id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: ImageFiles[];
  content: ImageFiles[];
  extra: {
    isNew: boolean;
    isBest: boolean;
    sort: number;
    category: string[];
    recommendedBy: string;
    isLiveSpecial: boolean;
    discountRate: number;
    discountedPrice: number;
  };
}

// API 서버의 상품 상세조회 응답
export interface ProductInfoRes {
  ok: 0 | 1;
  item: Product;
}

// API 서버의 상품 목록조회 응답
export interface ProductListRes {
  ok: 0 | 1;
  item: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductDetailInfoProps {
  item: {
    _id: number;
    name: string;
    price: number;
    path: string;
  };
  discountRate: number;
  discountedPrice: number;
  extra: {
    recommendedBy: string;
  };
}

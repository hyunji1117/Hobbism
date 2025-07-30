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
    live?: {
      start: string;
      end: string;
      title: string;
      livePath: string;
      liveId: string;
      livePrice: number;
      liveDiscountRate: number;
    };
  };
  options?: ProductOption[];
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

// 옵션
export interface ProductOption {
  name: string;
  values: string[];
}

// 상품 상세 정보
export interface ProductDetailInfoProps {
  item: { _id: number; name: string; price: number; path: string };
  discountRate: number;
  discountedPrice: number;
  extra: { recommendedBy: string };
  sizes?: string[];
  colors?: string[];
}

// 장바구니 액션
export interface CartActionsProps {
  price: number;
  options: string[];
  discountRate: number;
}

// 상품 수량 선택 컴포넌트
export interface ProductQuantitySelectorProps {
  selectedOption: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  price: number;
  discountedPrice: number;
}

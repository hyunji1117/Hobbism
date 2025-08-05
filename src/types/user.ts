import { Code } from '@/types/item';

export interface UserBookmark {
  products: number;
  users: number;
  posts: number;
}

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type UserListResponse = {
  ok: 1;
  item: User[];
  pagination: Pagination;
};

export interface User {
  _id: number;
  email: string; // SNS에서 가져온 이메일
  name: string; // SNS에서 가져온 이름
  phone?: string; // 전화번호 (선택사항)
  address?: string; // 주소 (선택사항)
  type: 'user' | 'seller' | 'admin'; // 사용자 권한
  loginType?: 'google' | 'kakao' | 'naver'; // 로그인 방식
  image?: string; // SNS 프로필 이미지
  token?: {
    // 로그인 후 받는 토큰
    accessToken: string;
    refreshToken: string;
  };
  extra?: {
    nickname?: string;
    introduction?: string;
    detail_address?: string;
    point?: number;
    total_point?: number;
    ownedItemCodes?: Code[];
    equippedItemCodes?: Code[];
    hobby?: string;
  };
  post?: number;
  bookmark?: {
    products?: number;
    users?: number;
    posts?: number;
  };
  bookmarkedBy?: {
    users?: number;
  };
  createdAt?: string; // 가입일
  updatedAt?: string; // 수정일
}

export interface UserState {
  // Zustand 스토어용
  user: User | null; // 현재 로그인된 사용자 (없으면 null)
  setUser: (user: User) => void; // 로그인시 사용자 저장
  resetUser: () => void; // 로그아웃시 사용자 초기화
}

export interface User {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  type: 'user' | 'seller' | 'admin'; // 사용자 유형
  loginType: 'email' | 'kakao' | 'google' | 'github'; // 로그인 방식
  image?: string; // 프로필 이미지
  picture?: string; // 프로필 이미지
  token?: {
    // 인증 토큰
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
  };
  extra: {
    nickname?: string;
    introduction?: string;
    deatil_address?: string;
  };
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  // extra: {};
  posts: number;
  bookmark: UserBookmark;
  bookmarkedBy: {
    users: number;
  };
  postViews: number;
}

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

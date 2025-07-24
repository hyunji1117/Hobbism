export interface User {
  _id: number; // 사용자 고유 ID
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
  createdAt?: string; // 가입일
  updatedAt?: string; // 수정일
}

export interface UserState {
  // Zustand 스토어용
  user: User | null; // 현재 로그인된 사용자 (없으면 null)
  setUser: (user: User) => void; // 로그인시 사용자 저장
  resetUser: () => void; // 로그아웃시 사용자 초기화
}

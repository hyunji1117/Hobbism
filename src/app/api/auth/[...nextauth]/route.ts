import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

declare module 'next-auth/jwt' {
  interface JWT {
    extra?: {
      providerAccountId?: string;
    };
    loginType?: string;
    type?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        if (!token.extra) {
          token.extra = {};
        }
        token.extra.providerAccountId = account.providerAccountId;
        token.loginType = account.provider;
        token.type = 'user';

        try {
          // 회원가입 시도
          const signupUrl = `https://fesp-api.koyeb.app/market/users/signup/oauth`;
          const signupRes = await fetch(signupUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Client-Id': 'febc13-final01-emjf',
            },
            body: JSON.stringify(token),
          });

          // 회원가입 성공 시 자동 로그인
          if (signupRes.ok || signupRes.status === 409) {
            if (signupRes.ok) {
              console.log('회원가입 완료 - 자동 로그인 시도');
            } else {
              console.log('이미 가입한 사용자 - 로그인 시도');
            }

            let loginUrl = '';
            let loginData = {};

            if (
              token.loginType === 'kakao' ||
              token.loginType === 'google' ||
              token.loginType === 'naver'
            ) {
              loginUrl = `https://fesp-api.koyeb.app/market/users/login/with`;
              loginData = {
                providerAccountId: token.extra?.providerAccountId,
              };
            }

            const loginRes = await fetch(loginUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Client-Id': 'febc13-final01-emjf',
              },
              body: JSON.stringify(loginData),
            });

            if (loginRes.ok) {
              console.log('로그인에 성공했습니다.');
              const userData = await loginRes.json();
              console.log('로그인 응답 데이터:', userData);

              if (userData.token) {
                token.accessToken = userData.token.accessToken;
                token.refreshToken = userData.token.refreshToken;
              } else if (userData.item && userData.item.token) {
                token.accessToken = userData.item.token.accessToken;
                token.refreshToken = userData.item.token.refreshToken;
              } else {
                console.log('토큰을 찾을 수 없습니다');
              }
            } else {
              console.log('로그인 실패 :', loginRes.status);
            }
          } else {
            console.log('회원가입 실패:', signupRes.status);
          }

          console.log('최종 토큰 :::::', token);
        } catch (error) {
          console.error(error);
        }
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

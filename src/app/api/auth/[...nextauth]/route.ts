import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { cookies } from 'next/headers';

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

declare module 'next-auth/jwt' {
  interface JWT {
    extra?: {
      providerAccountId?: string;
    };
    loginType?: string;
    type?: string;
    accessToken?: string;
    _id?: number;
    name?: string;
    email?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    loginType?: string;
    user: {
      _id?: number;
      name?: string;
      email?: string;
      image?: string;
      points?: number;
      address?: string;
      phone?: string;
    };
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
        console.log('token', token);
        token.extra.providerAccountId = account.providerAccountId;
        token.loginType = account.provider;
        token.type = 'user';
        token.image = token.picture;
        delete token.picture;
        token.points = 0;
        token.address = null;
        token.phone = '01000000000';

        try {
          // 회원가입 시도
          const signupUrl = `${NEXT_PUBLIC_API_URL}/users/signup/oauth`;
          const signupRes = await fetch(signupUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
            },
            body: JSON.stringify(token),
          });
          console.log(NEXT_PUBLIC_CLIENT_ID);

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
              loginUrl = `${NEXT_PUBLIC_API_URL}/users/login/with`;
              loginData = {
                providerAccountId: token.extra?.providerAccountId,
              };
            }

            const loginRes = await fetch(loginUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
              },
              body: JSON.stringify(loginData),
            });

            if (loginRes.ok) {
              console.log('로그인에 성공했습니다.');
              const userData = await loginRes.json();
              console.log('로그인 응답 데이터:', userData);

              if (userData.item && userData.item.token) {
                token.accessToken = userData.item.token.accessToken;
                token._id = userData.item._id;
                token.name = userData.item.name;
                token.email = userData.item.email || token.email;
                token.image = userData.item.image;

                if (userData.item.token.refreshToken) {
                  const cookieStore = await cookies();
                  cookieStore.set(
                    'refresh-token',
                    userData.item.token.refreshToken,
                    {
                      httpOnly: true,
                      secure: process.env.NODE_ENV === 'production',
                      sameSite: 'lax',
                      maxAge: 60 * 60 * 24 * 30, // 30일
                      path: '/',
                    },
                  );
                  console.log('RefreshToken이 httpOnly 쿠키에 저장됨');
                }
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
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.loginType = token.loginType;

      if (session.user) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image =
          typeof token.image === 'string' ? token.image : undefined;
        session.user.points =
          typeof token.points === 'number' ? token.points : undefined;
        session.user.address =
          typeof token.address === 'string' ? token.address : undefined;
        session.user.phone =
          typeof token.phone === 'string' ? token.phone : undefined;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };

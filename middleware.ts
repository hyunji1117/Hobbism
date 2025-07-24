import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// 미들웨어
const protectedRoutes = ['/character', '/community', '/live', '/shop', '/user'];

const openRoutes = ['/', '/login'];

// 엑세스 토큰 검증
async function verifyAccessToken(
  accessToken: string,
  _id: number,
): Promise<boolean> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/user/${_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
      },
    });

    return response.ok;
  } catch (error) {
    console.log('accessToken 검증 실패', error);
  }
  return false;
}

// 리프레시로 엑세스 재발급
async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('accessToken 재발급 성공');
      return data.accessToken;
    }
  } catch (error) {
    console.log('accessToken 재발급 오류', error);
  }
  return null;
}

// JWT 토큰 업데이트
import type { JWT } from 'next-auth/jwt';

async function updateJwtToken(
  existingToken: JWT,
  newAccessToken: string,
): Promise<string> {
  const { encode } = await import('next-auth/jwt');

  const updatedToken = {
    ...existingToken,
    accessToken: newAccessToken,
  };

  return await encode({
    token: updatedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}

// 비로그인자 접근 차단
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // // 차단 경로
  // if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
  //   return NextResponse.next();
  // }
  // // 공개 경로
  // if (openRoutes.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // const isProtectedRoute = protectedRoutes.some(route =>
  //   pathname.startsWith(route),
  // );
  // if (isProtectedRoute) {
  //   const token = await getToken({
  //     req: request,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   });
  //   // 토큰 없는 경우 (비로그인)
  //   if (!token) {
  //     const loginUrl = new URL('/login', request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   // 토큰 있는 경우
  //   if (token.accessToken && token._id) {
  //     const isValidToken = await verifyAccessToken(
  //       token.accessToken,
  //       token._id as number,
  //     );
  //     // 재발급 시도
  //     if (!isValidToken) {
  //       const refreshToken = request.cookies.get('refresh-token')?.value;
  //       // 리프레시 토큰 확인
  //       if (refreshToken) {
  //         const newAccessToken = await refreshAccessToken(refreshToken);
  //         // 새로운 엑세스 토큰 발급
  //         if (newAccessToken) {
  //           try {
  //             const updatedJwtToken = await updateJwtToken(
  //               token,
  //               newAccessToken,
  //             );
  //             const response = NextResponse.next();

  //             response.cookies.set('next-auth.session-token', updatedJwtToken, {
  //               httpOnly: true,
  //               secure: process.env.NODE_ENV === 'production',
  //               sameSite: 'lax',
  //               maxAge: 60 * 60 * 24 * 30, // 30일
  //               path: '/',
  //             });
  //             return response;
  //           } catch (error) {
  //             console.log('JWT 갱신 실패:', error);
  //             const loginUrl = new URL('/login', request.url);
  //             return NextResponse.redirect(loginUrl);
  //           }
  //         } else {
  //           console.log('accessToken 재발급 실패');
  //           const loginUrl = new URL('/login', request.url);
  //           return NextResponse.redirect(loginUrl);
  //         }
  //       } else {
  //         console.log('RefreshToken 없음');
  //         const loginUrl = new URL('/login', request.url);
  //         return NextResponse.redirect(loginUrl);
  //       }
  //     }
  //   } else {
  //     console.log('기존 accessToken 또는 사용자 id 없음');
  //     const loginUrl = new URL('/login', request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}

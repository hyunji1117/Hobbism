// src/middleware.ts
// 관리자 및 사용자 인증 미들웨어
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// 관리자 세션 검증 (세션 스토리지 기반)
async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  // 관리자 세션 쿠키 확인
  const adminSessionToken = request.cookies.get('admin-session-token')?.value;

  if (!adminSessionToken) {
    console.log('관리자 세션 토큰 없음');
    return false;
  }

  try {
    // 세션 토큰 검증 (실제 구현에서는 데이터베이스나 Redis 확인)
    // 여기서는 간단한 JWT 검증으로 대체
    const { jwtVerify } = await import('jose');
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-key',
    );

    const { payload } = await jwtVerify(adminSessionToken, secret);

    // admin 세션인지 확인
    if (payload.purpose !== 'admin_session') {
      console.log('유효하지 않은 관리자 세션');
      return false;
    }

    // 세션 만료 확인
    if (payload.exp && Number(payload.exp) < Math.floor(Date.now() / 1000)) {
      console.log('관리자 세션 만료됨');
      return false;
    }

    return true;
  } catch (error) {
    console.error('관리자 세션 검증 실패:', error);
    return false;
  }
}

// 비로그인자 접근 차단
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 경로와 Next.js 내부 경로는 통과
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // ===== 관리자 경로 처리 =====
  if (pathname.startsWith('/admin')) {
    // /admin/login은 항상 허용
    if (pathname === '/admin/login') {
      // 이미 로그인된 경우 /admin으로 리다이렉트
      const isAdminLoggedIn = await verifyAdminSession(request);
      if (isAdminLoggedIn) {
        const adminUrl = new URL('/admin', request.url);
        return NextResponse.redirect(adminUrl);
      }
      return NextResponse.next();
    }

    // 그 외 모든 /admin/* 경로는 인증 필요
    const isAdminAuthenticated = await verifyAdminSession(request);

    if (!isAdminAuthenticated) {
      console.log(`[Admin Auth] 미인증 접근 차단: ${pathname}`);
      const loginUrl = new URL('/admin/login', request.url);
      // 원래 가려던 경로를 쿼리 파라미터로 추가 (로그인 후 리다이렉트용)
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log(`[Admin Auth] 인증된 접근 허용: ${pathname}`);
    return NextResponse.next();
  }

  // ===== 일반 사용자 경로 처리 =====
  // 공개 경로는 통과
  if (openRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // JWT 토큰을 쿠키에서 가져옴
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 토큰 없는 경우 (비로그인)
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 토큰 있는 경우 검증
  if (token.accessToken && token._id) {
    const isValidToken = await verifyAccessToken(
      token.accessToken,
      token._id as number,
    );

    // 토큰 재발급 시도
    if (!isValidToken) {
      const refreshToken = request.cookies.get('refresh-token')?.value;

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          try {
            const updatedJwtToken = await updateJwtToken(token, newAccessToken);
            const response = NextResponse.next();

            response.cookies.set('next-auth.session-token', updatedJwtToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 30, // 30일
              path: '/',
            });
            return response;
          } catch (error) {
            console.log('JWT 갱신 실패:', error);
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
          }
        } else {
          console.log('accessToken 재발급 실패');
          const loginUrl = new URL('/login', request.url);
          return NextResponse.redirect(loginUrl);
        }
      } else {
        console.log('RefreshToken 없음');
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  } else {
    console.log('기존 accessToken 또는 사용자 id 없음');
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어 실행될 경로 - 중요: /admin 경로 추가
export const config = {
  matcher: [
    // 일반 사용자 보호 경로
    '/character/:path*',
    '/community/:path*',
    '/live',
    '/shop/:path*',
    '/user/:path*',
    '/hobby',
    '/search',
    // 관리자 보호 경로 - 반드시 추가
    '/admin/:path*',
  ],
};

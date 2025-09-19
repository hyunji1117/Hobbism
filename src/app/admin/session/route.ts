// src/app/admin/session/route.ts
// 관리자 세션 생성 및 삭제 API 라우트
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 데모 계정 확인 (실제로는 데이터베이스 확인)
    const DEMO_EMAIL = process.env.NEXT_PUBLIC_ADMIN_DEMO_EMAIL;
    const DEMO_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSWORD;

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
        { status: 401 },
      );
    }

    // 관리자 세션 JWT 토큰 생성
    const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
    const secret = new TextEncoder().encode(JWT_SECRET);
    const sessionDuration = process.env.ADMIN_SESSION_DURATION || '1800'; // 30분

    const sessionToken = await new SignJWT({
      purpose: 'admin_session',
      email: email,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(`${sessionDuration}s`)
      .sign(secret);

    // 쿠키로 세션 토큰 설정
    const response = NextResponse.json({
      success: true,
      message: '로그인 성공',
      user: {
        email: email,
        role: 'admin',
      },
    });

    response.cookies.set('admin-session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parseInt(sessionDuration),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('관리자 세션 생성 중 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

// 세션 삭제 (로그아웃)
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: '로그아웃 성공',
  });

  // 쿠키 삭제
  response.cookies.set('admin-session-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}

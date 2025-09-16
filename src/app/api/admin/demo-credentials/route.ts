import { NextRequest, NextResponse } from 'next/server';

// jose 라이브러리 사용 (Edge Runtime 호환)
import { jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문에서 토큰 추출
    const body = await request.json();
    const { token } = body;

    // 2. 토큰이 없으면 에러
    if (!token) {
      return NextResponse.json(
        { success: false, message: '토큰이 필요합니다' },
        { status: 401 },
      );
    }

    // 3. JWT Secret 설정
    const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
    const secret = new TextEncoder().encode(JWT_SECRET);

    try {
      // 4. jose로 JWT 검증
      const { payload } = await jwtVerify(token, secret);

      // 5. 토큰 용도 확인
      if (payload.purpose !== 'demo_view') {
        return NextResponse.json(
          { success: false, message: '유효하지 않은 토큰입니다' },
          { status: 401 },
        );
      }

      // 6. 데모 계정 정보 가져오기
      const demoEmail = process.env.ADMIN_DEMO_EMAIL;
      const demoPassword = process.env.ADMIN_DEMO_PASSWORD;

      // 7. 비밀번호 마스킹
      const maskedPassword = demoPassword
        ? '••••••' + demoPassword.slice(-2)
        : '••••••••';

      console.log('데모 계정 정보 전송 성공');

      // 8. 성공 응답
      return NextResponse.json({
        success: true,
        credentials: {
          email: demoEmail,
          password: maskedPassword,
          fullPassword: demoPassword,
          tokenExpiry: payload.exp,
          remainingTime: payload.exp
            ? Number(payload.exp) - Math.floor(Date.now() / 1000)
            : 0,
        },
      });
    } catch (jwtError) {
      // 9. JWT 검증 실패
      console.log('[Security] 유효하지 않은 토큰:', jwtError);

      return NextResponse.json(
        {
          success: false,
          message: '토큰이 만료되었거나 유효하지 않습니다',
        },
        { status: 401 },
      );
    }
  } catch (error) {
    // 10. 일반 에러 처리
    console.error('데모 계정 정보 조회 중 오류:', error);

    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';

    return NextResponse.json(
      {
        success: false,
        message: '서버 오류가 발생했습니다',
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

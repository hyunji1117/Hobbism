import { NextRequest, NextResponse } from 'next/server';

// App Router에서는 jose 라이브러리 사용 (Edge Runtime 호환)
import { SignJWT } from 'jose';

export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문에서 PIN 추출
    const body = await request.json();
    const { pin } = body;

    console.log('받은 PIN:', pin);
    console.log('환경변수 PIN:', process.env.ADMIN_PIN_SECRET);

    // 2. 환경 변수 확인
    const EXPECTED_PIN = process.env.ADMIN_PIN_SECRET;
    const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

    if (!EXPECTED_PIN) {
      console.error('ADMIN_PIN_SECRET 환경변수가 설정되지 않음');
      return NextResponse.json(
        { success: false, message: '서버 설정 오류' },
        { status: 500 },
      );
    }

    // 3. PIN 검증
    if (!pin) {
      return NextResponse.json(
        { success: false, message: 'PIN을 입력해주세요' },
        { status: 400 },
      );
    }

    // 4. PIN 비교
    if (pin === EXPECTED_PIN) {
      // 5. jose를 사용한 JWT 토큰 생성
      const secret = new TextEncoder().encode(JWT_SECRET);

      const token = await new SignJWT({
        purpose: 'demo_view',
        iat: Math.floor(Date.now() / 1000),
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('5m')
        .sign(secret);

      console.log('토큰 생성 성공');

      return NextResponse.json({
        success: true,
        token: token,
        expiresIn: 300,
      });
    } else {
      console.log('PIN 불일치:', { 입력값: pin, 기대값: EXPECTED_PIN });

      return NextResponse.json(
        { success: false, message: 'PIN이 올바르지 않습니다' },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error('PIN 검증 중 오류:', error);

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

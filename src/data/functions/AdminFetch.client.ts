// 관리자 페이지 전용 API 호출 함수

'use client';

import { ShieldAlert, Clock4, Globe, Monitor } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 환경 변수에서 데모 계정 정보 가져오기
const DEMO_EMAIL = process.env.NEXT_PUBLIC_ADMIN_DEMO_EMAIL;
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSWORD;

// 관리자 토큰 관리
let adminAccessToken: string | null = null;

// 관리자 토큰 설정
export const setAdminToken = (token: string) => {
  adminAccessToken = token;
  // 세션 스토리지에 저장 (보안상 로컬 스토리지보다 안전)
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('adminToken', token);
  }
};

// 관리자 토큰 가져오기
export const getAdminToken = (): string | null => {
  if (adminAccessToken) return adminAccessToken;

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      adminAccessToken = token;
      return token;
    }
  }

  return null;
};

// 관리자 토큰 삭제
export const clearAdminToken = () => {
  adminAccessToken = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminToken');
  }
};

// 관리자 로그인
export async function adminLogin(email: string, password: string) {
  try {
    // 개발 환경에서 데모 계정 처리
    if (!API_URL || process.env.NODE_ENV === 'production') {
      // if (!API_URL) {
      // 환경 변수가 설정되어 있고, 입력값이 일치하는 경우
      if (
        DEMO_EMAIL &&
        DEMO_PASSWORD &&
        email === DEMO_EMAIL &&
        password === DEMO_PASSWORD
      ) {
        const demoToken = 'demo-admin-token-' + Date.now();
        setAdminToken(demoToken);
        return {
          ok: true,
          data: {
            token: demoToken,
            user: {
              email: DEMO_EMAIL,
              name: '관리자',
              role: 'admin',
            },
          },
        };
      } else {
        return {
          ok: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        };
      }
    }

    const res = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    const data = await res.json();

    // 토큰 저장
    if (data.token) {
      setAdminToken(data.token);
    }

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('관리자 로그인 오류:', error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : '로그인에 실패했습니다.',
    };
  }
}

// 관리자 로그아웃
export async function adminLogout() {
  try {
    const token = getAdminToken();

    if (!token) {
      throw new Error('로그인 상태가 아닙니다.');
    }

    const res = await fetch(`${API_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    // 토큰 삭제
    clearAdminToken();

    if (!res.ok) {
      console.warn('로그아웃 API 호출 실패, 로컬 토큰만 삭제됨');
    }

    return {
      ok: true,
      message: '로그아웃되었습니다.',
    };
  } catch (error) {
    console.error('관리자 로그아웃 오류:', error);
    // 에러가 발생해도 로컬 토큰은 삭제
    clearAdminToken();
    return {
      ok: true,
      message: '로그아웃되었습니다.',
    };
  }
}

// PIN 번호 실패 알림 이메일 발송
export async function sendPinFailureAlert(attemptInfo: {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}) {
  try {
    const res = await fetch(`${API_URL ? API_URL : ''}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      // AdminFetch.client.ts의 sendPinFailureAlert 함수 내 body 부분

      body: JSON.stringify({
        to: 'eve0204eve@gmail.com',
        serviceName: 'Hobbism(하비즘)',
        subject: '[경고] 관리자 페이지 접근 시도 확인됨',
        content: `
    <div style="width: 100%; max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Email Header -->
  <div style="background-color: #7c3aed; padding: 24px;">
    <div style="display: flex; align-items: center;">
      <h2 style="color: #ffffff; font-size: 18px; font-weight: 500; margin: 0;">⚠️ Hobbism(하비즘) 보안 알림</h2>
    </div>
  </div>
  <!-- Email Body -->
  <div style="padding: 32px 24px;">
    <h1 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 24px;">보안 경고</h1>
    <div style="margin-bottom: 24px;">
      <p style="color: #374151; margin-bottom: 16px; line-height: 1.6;">Hobbism(하비즘) 관리자 페이지에서 데모 계정 정보 확인을 위한 PIN 번호 접근 시도가 확인되었습니다.</p>
      <p style="color: #374151; font-weight: 500; line-height: 1.6;">PIN 번호 입력 실패로 계정이 일시적으로 잠금 처리되었습니다.</p>
    </div>
    <div style="background-color: #faf5ff; border-left: 4px solid #7c3aed; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
          <path d="M12 6v6l4 2"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <p style="color: #374151; margin: 0; line-height: 1.5;"><strong>발생 시간 :</strong> ${attemptInfo.timestamp}</p>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        <p style="color: #374151; margin: 0; line-height: 1.5;"><strong>IP 주소 :</strong> ${attemptInfo.ipAddress}</p>
      </div>
      <div style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
          <rect width="20" height="14" x="2" y="3" rx="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
        <p style="color: #374151; margin: 0; line-height: 1.5;"><strong>브라우저 :</strong> ${attemptInfo.userAgent}</p>
      </div>
    </div>
    <div style="background-color: #ede9fe; padding: 16px; border-radius: 8px; border: 1px solid #ddd6fe;">
      <p style="color: #6d28d9; font-weight: 500; margin: 0; line-height: 1.6;">만약 본인이 시도한 것이 아니라면 즉시 보안 조치를 취하시기 바랍니다.</p>
    </div>
  </div>
  <!-- Email Footer -->
  <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb;">
    <p style="font-size: 14px; color: #6b7280; margin: 0; text-align: center;">© 2025 하비즘(Hobbism). All rights reserved.</p>
  </div>
</div>
  `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('이메일 발송 실패:', errorData);
      throw new Error(errorData.message || '이메일 발송에 실패했습니다.');
    }

    const data = await res.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('PIN 실패 알림 이메일 발송 오류:', error);

    return {
      ok: false,
      message:
        error instanceof Error ? error.message : '이메일 발송에 실패했습니다.',
    };
  }
}

// 관리자 정보 확인 (토큰 유효성 검증)
export async function verifyAdminSession() {
  try {
    const token = getAdminToken();

    if (!token) {
      return {
        ok: false,
        message: '로그인이 필요합니다.',
      };
    }

    // 개발 환경 데모 토큰 처리
    if (
      process.env.NODE_ENV === 'production' &&
      token.startsWith('demo-admin-token-')
    ) {
      return {
        ok: true,
        data: {
          user: {
            email: DEMO_EMAIL || 'admin@hobbism.com',
            name: '관리자',
            role: 'admin',
          },
        },
      };
    }

    const res = await fetch(`${API_URL}/admin/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      clearAdminToken();
      return {
        ok: false,
        message: '세션이 만료되었습니다.',
      };
    }

    const data = await res.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error('관리자 세션 확인 오류:', error);
    clearAdminToken();
    return {
      ok: false,
      message: '세션 확인에 실패했습니다.',
    };
  }
}

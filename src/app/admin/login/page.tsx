'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  adminLogin,
  sendPinFailureAlert,
  clearAdminToken,
} from '@/data/functions/AdminFetch.client';

const AdminLoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 차단 시간 설정 (초 단위)
  const BLOCK_DURATION_SECONDS = 30;

  // 데모 계정 보호 관련 상태
  // 토큰 기반 (JWT 토큰 저장)
  const [demoToken, setDemoToken] = useState<string | null>(null);
  const [demoCredentials, setDemoCredentials] = useState<{
    // 서버에서 받은 데모 계정 정보
    email: string;
    password: string;
    fullPassword?: string;
  } | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number>(0);
  const [demoPin, setDemoPin] = useState('');
  const [demoPinError, setDemoPinError] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // 토큰 만료 타이머
  useEffect(() => {
    if (tokenExpiry > 0) {
      const checkExpiry = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        if (now >= tokenExpiry) {
          // 토큰 만료 시 초기화
          setDemoToken(null);
          setDemoCredentials(null);
          setTokenExpiry(0);
          clearInterval(checkExpiry);
        }
      }, 1000);

      return () => clearInterval(checkExpiry);
    }
  }, [tokenExpiry]);

  // 컴포넌트 마운트 시 기존 토큰 클리어
  useEffect(() => {
    clearAdminToken();
  }, []);

  // 로컬 스토리지에서 시도 횟수 불러오기
  useEffect(() => {
    const storedAttempts = localStorage.getItem('pinAttempts');
    const blockedUntil = localStorage.getItem('blockedUntil');

    if (storedAttempts) {
      setPinAttempts(parseInt(storedAttempts));
    }

    if (blockedUntil) {
      const blockedTime = parseInt(blockedUntil);
      if (Date.now() < blockedTime) {
        setIsBlocked(true);
        const timeRemaining = blockedTime - Date.now();
        setRemainingTime(Math.ceil(timeRemaining / 1000));

        setTimeout(() => {
          setIsBlocked(false);
          setPinAttempts(0);
          setRemainingTime(0);
          localStorage.removeItem('pinAttempts');
          localStorage.removeItem('blockedUntil');
        }, timeRemaining);
      } else {
        localStorage.removeItem('pinAttempts');
        localStorage.removeItem('blockedUntil');
      }
    }
  }, []);

  // 카운트다운 타이머
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setPinAttempts(0);
            setEmailSent(false);
            setDemoPinError('');
            localStorage.removeItem('pinAttempts');
            localStorage.removeItem('blockedUntil');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await adminLogin(formData.email, formData.password);

      if (result.ok) {
        console.log('관리자 로그인 성공:', result.data);

        if (formData.rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('adminRememberMe', 'true');
        }

        router.push('/admin');
      } else {
        setErrors({
          form: result.message || '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
      }
    } catch (error) {
      console.error('관리자 로그인 오류:', error);
      setErrors({ form: '로그인에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const sendAlertEmail = async () => {
    try {
      const attemptInfo = {
        timestamp: new Date().toLocaleString('ko-KR'),
        ipAddress:
          typeof window !== 'undefined' ? window.location.hostname : 'Unknown',
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      };

      const result = await sendPinFailureAlert(attemptInfo);

      if (result.ok) {
        console.log('경고 이메일 발송 완료');
        setEmailSent(true);
      } else {
        console.error('이메일 발송 실패:', result.message);
        setEmailSent(true);
      }
    } catch (error) {
      console.error('이메일 발송 중 오류:', error);
      setEmailSent(true);
    }
  };

  // 서버 API를 통한 PIN 검증 함수
  const verifyPinWithServer = async (
    pin: string,
  ): Promise<{
    success: boolean;
    token?: string;
    expiresIn?: number;
  }> => {
    try {
      const response = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PIN 검증 오류:', error);
      return { success: false };
    }
  };

  // 토큰으로 데모 계정 정보 가져오기
  const fetchDemoCredentials = async (token: string) => {
    try {
      const response = await fetch('/api/admin/demo-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success && data.credentials) {
        setDemoCredentials(data.credentials);
        // 토큰 만료 시간 설정
        if (data.credentials.tokenExpiry) {
          setTokenExpiry(data.credentials.tokenExpiry);
        }
      } else {
        // 토큰이 유효하지 않으면 초기화
        setDemoToken(null);
        setDemoPinError('토큰이 만료되었습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('데모 계정 정보 조회 오류:', error);
      setDemoToken(null);
    }
  };

  // PIN 제출 핸들러 - 서버 검증 사용
  const handleDemoPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      if (minutes > 0) {
        setDemoPinError(
          `차단되었습니다. ${minutes}분 ${seconds}초 후에 다시 시도하세요.`,
        );
      } else {
        setDemoPinError(`차단되었습니다. ${seconds}초 후에 다시 시도하세요.`);
      }
      return;
    }

    // 서버에 PIN 검증 요청
    const verificationResult = await verifyPinWithServer(demoPin);

    if (verificationResult.success && verificationResult.token) {
      // PIN 검증 성공 - 토큰 저장
      setDemoToken(verificationResult.token);
      setDemoPinError('');
      setDemoPin('');
      setPinAttempts(0);
      localStorage.removeItem('pinAttempts');
      setEmailSent(false);

      // 토큰으로 데모 계정 정보 가져오기
      await fetchDemoCredentials(verificationResult.token);
    } else {
      // PIN 검증 실패
      const newAttempts = pinAttempts + 1;
      setPinAttempts(newAttempts);
      localStorage.setItem('pinAttempts', newAttempts.toString());

      if (newAttempts >= 1) {
        if (!emailSent) {
          await sendAlertEmail();
        }

        const blockedUntil = Date.now() + BLOCK_DURATION_SECONDS * 1000;
        localStorage.setItem('blockedUntil', blockedUntil.toString());
        setIsBlocked(true);
        setRemainingTime(BLOCK_DURATION_SECONDS);

        const displayMinutes = Math.floor(BLOCK_DURATION_SECONDS / 60);
        const displaySeconds = BLOCK_DURATION_SECONDS % 60;
        if (displayMinutes > 0) {
          setDemoPinError(
            `PIN 번호 입력을 실패하였습니다. ${displayMinutes}분 ${displaySeconds}초간 차단됩니다.`,
          );
        } else {
          setDemoPinError(
            `PIN 번호 입력을 실패하였습니다. ${displaySeconds}초간 차단됩니다.`,
          );
        }
      }

      setDemoPin('');
    }
  };

  const handleDemoPinChange = (value: string) => {
    if (isBlocked) return;

    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setDemoPin(numericValue);

    if (demoPinError && !isBlocked) {
      setDemoPinError('');
    }
  };

  // 데모 계정으로 자동 입력 - 서버에서 받은 정보 사용
  const fillDemoCredentials = () => {
    if (demoCredentials && demoCredentials.fullPassword) {
      setFormData({
        email: demoCredentials.email,
        password: demoCredentials.fullPassword,
        rememberMe: false,
      });
      // 토큰과 데모 정보 초기화 (일회성 사용)
      setDemoToken(null);
      setDemoCredentials(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 pt-15 pb-10">
      <div className="w-full max-w-md">
        {/* 관리자 로고 및 타이틀 */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-15 w-15 items-center justify-center rounded-full bg-red-600">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">관리자 로그인</h1>
          <p className="text-gray-300">Hobbism 백오피스 시스템</p>
        </div>

        {/* 로그인 카드 */}
        <div className="mx-8 mt-8 mb-4 min-w-[250px] rounded-xl bg-white p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 전체 에러 메시지 */}
            {errors.form && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex">
                  <svg
                    className="mr-2 h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-red-700">{errors.form}</span>
                </div>
              </div>
            )}

            {/* 이메일 입력 */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                관리자 이메일
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="이메일을 입력해주세요"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-red-500 ${
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                }`}
                placeholder="비밀번호를 입력해주세요"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* 로그인 유지 체크박스 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={e =>
                    handleInputChange('rememberMe', e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-600">
                  로그인 상태 유지
                </span>
              </label>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-red-300 border-t-white"></div>
                  <span>로그인 중...</span>
                </div>
              ) : (
                <span className="font-medium">관리자 로그인</span>
              )}
            </button>
          </form>

          {/* 토큰 기반으로 조건부 렌더링 */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            {!demoCredentials ? (
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                  🔐 데모 계정 보기
                </h4>
                <form onSubmit={handleDemoPinSubmit} className="space-y-0">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      4자리 PIN 번호를 입력하세요
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        value={demoPin}
                        onChange={e => handleDemoPinChange(e.target.value)}
                        className={`min-h-[38px] min-w-[80px] flex-1 rounded border px-3 py-2 text-center text-sm focus:border-transparent focus:ring-2 focus:ring-red-500 ${
                          demoPinError
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        } ${isBlocked ? 'cursor-not-allowed opacity-50' : ''}`}
                        placeholder={isBlocked ? '차단됨' : '••••'}
                        maxLength={4}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        disabled={isBlocked}
                      />
                      <button
                        type="submit"
                        disabled={demoPin.length !== 4 || isBlocked}
                        className="min-h-9.5 min-w-13 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        확인
                      </button>
                    </div>
                    {demoPinError && (
                      <p className="mt-1 text-xs text-red-600">
                        {demoPinError}
                      </p>
                    )}
                    {isBlocked && remainingTime > 0 && (
                      <div className="mt-3 rounded bg-red-100 p-3 text-center">
                        <p className="text-sm font-medium text-red-800">
                          🔒 차단 상태
                        </p>
                        <p className="mt-1 text-2xl font-bold text-red-900">
                          {Math.floor(remainingTime / 60) > 0 ? (
                            <>
                              {Math.floor(remainingTime / 60)}:
                              {(remainingTime % 60).toString().padStart(2, '0')}
                            </>
                          ) : (
                            <>{remainingTime}초</>
                          )}
                        </p>
                        <p className="mt-1 text-xs text-red-700">
                          {Math.floor(remainingTime / 60) > 0
                            ? '남은 차단 시간'
                            : '곧 차단이 해제됩니다'}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    // 토큰과 데모 정보 초기화
                    setDemoToken(null);
                    setDemoCredentials(null);
                    setTokenExpiry(0);
                  }}
                  className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                  aria-label="닫기"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h4 className="mb-2 text-sm font-medium text-gray-900">
                  📝 데모 계정
                </h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>
                    <strong>이메일:</strong> {demoCredentials.email}
                  </p>
                  <p>
                    <strong>비밀번호:</strong> {demoCredentials.password}
                  </p>

                  {/* 토큰 남은 시간 표시 */}
                  {tokenExpiry > 0 && (
                    <p className="mt-2 text-xs text-yellow-600">
                      ⏱️{' '}
                      {(() => {
                        const remainingSeconds = Math.max(
                          0,
                          tokenExpiry - Math.floor(Date.now() / 1000),
                        );
                        const minutes = Math.floor(remainingSeconds / 60);
                        const seconds = remainingSeconds % 60;
                        return `${minutes}분 ${seconds}초`;
                      })()}
                      후 자동 닫힘
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    * 실제 계정 정보는 관리자에게 문의하세요
                  </p>
                </div>
                {demoCredentials.fullPassword && (
                  <button
                    onClick={fillDemoCredentials}
                    className="mt-3 w-full rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    데모 계정으로 자동 입력
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white"
          >
            ← 일반 사용자 로그인으로 돌아가기
          </Link>
        </div>

        {/* 보안 안내 */}
        <div className="mx-8 mt-6 rounded-lg bg-gray-800 p-4">
          <h4 className="mb-2 text-sm font-medium text-white">🔒 보안 안내</h4>
          <ul className="space-y-1 text-xs text-gray-300">
            <li>• 관리자 계정은 승인된 관리자만 사용할 수 있습니다</li>
            <li>• 공용 컴퓨터에서는 로그인 상태 유지를 사용하지 마세요</li>
            <li>• 의심스러운 활동이 감지되면 즉시 담당자 컨텍해주세요</li>
          </ul>
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Hobbism Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

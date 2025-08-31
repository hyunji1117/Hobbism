'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 데모 계정 보호 관련 상태
  const [showDemoAccount, setShowDemoAccount] = useState(false);
  const [demoPin, setDemoPin] = useState('');
  const [demoPinError, setDemoPinError] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 입력 시 에러 메시지 제거
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
      // 여기에 실제 관리자 인증 로직 구현 예정
      console.log('관리자 로그인 시도:', formData);

      // 임시 딜레이 (실제 API 호출 시뮬레이션)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 간단한 더미 인증 (실제로는 서버에서 검증)
      if (
        formData.email === 'admin@hobbism.com' &&
        formData.password === 'admin123'
      ) {
        // 로그인 성공 시 관리자 페이지로 이동
        router.push('/admin');
      } else {
        setErrors({ form: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      }
    } catch (error) {
      console.error('관리자 로그인 실패:', error);
      setErrors({ form: '로그인에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (demoPin === '9999') {
      setShowDemoAccount(true);
      setDemoPinError('');
      setDemoPin('');
    } else {
      setDemoPinError('잘못된 PIN 번호입니다.');
      setDemoPin('');
    }
  };

  const handleDemoPinChange = (value: string) => {
    // 숫자만 입력 가능하도록 하고, 4자리까지만 입력
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);
    setDemoPin(numericValue);

    // 에러 메시지 초기화
    if (demoPinError) {
      setDemoPinError('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-10">
      <div className="w-full max-w-md">
        {/* 관리자 로고 및 타이틀 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
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
        <div className="rounded-xl bg-white p-8 shadow-2xl">
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

              <Link
                href="/admin/forgot-password"
                className="text-sm text-red-600 hover:text-red-800"
              >
                비밀번호 찾기
              </Link>
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

          {/* 데모 계정 안내 */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            {!showDemoAccount ? (
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                  🔐 데모 계정 보기
                </h4>
                <form onSubmit={handleDemoPinSubmit} className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      4자리 PIN 번호를 입력하세요
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        value={demoPin}
                        onChange={e => handleDemoPinChange(e.target.value)}
                        className={`flex-1 rounded border px-3 py-2 text-center text-sm focus:border-transparent focus:ring-2 focus:ring-red-500 ${
                          demoPinError
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="••••"
                        maxLength={4}
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                      <button
                        type="submit"
                        disabled={demoPin.length !== 4}
                        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        확인
                      </button>
                    </div>
                    {demoPinError && (
                      <p className="mt-1 text-xs text-red-600">
                        {demoPinError}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDemoAccount(false)}
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
                    <strong>이메일:</strong> admin@hobbism.com
                  </p>
                  <p>
                    <strong>비밀번호:</strong> admin123
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white"
          >
            ← 일반 사용자 로그인으로 돌아가기
          </Link>
        </div>

        {/* 보안 안내 */}
        <div className="mt-6 rounded-lg bg-gray-800 p-4">
          <h4 className="mb-2 text-sm font-medium text-white">🔒 보안 안내</h4>
          <ul className="space-y-1 text-xs text-gray-300">
            <li>• 관리자 계정은 승인된 관리자만 사용할 수 있습니다</li>
            <li>• 공용 컴퓨터에서는 로그인 상태 유지를 사용하지 마세요</li>
            <li>• 비밀번호는 정기적으로 변경해주세요</li>
            <li>• 의심스러운 활동이 감지되면 즉시 보고해주세요</li>
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

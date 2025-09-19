// Admin Dashboard Page - src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'dashboard',
      name: '대시보드',
      icon: '📊',
      path: '/admin',
    },
    {
      id: 'sales',
      name: '매출 관리',
      icon: '💰',
      path: '/admin/sales',
    },
    {
      id: 'products',
      name: '상품 관리',
      icon: '📦',
      path: '/admin/products',
    },
    {
      id: 'brands',
      name: '브랜드 관리',
      icon: '🏢',
      path: '/admin/brands',
    },
    {
      id: 'cs',
      name: 'CS 관리',
      icon: '🎧',
      path: '/admin/cs',
    },
  ];

  // 초기 데이터 로딩 시뮬레이션
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        // 실제 API 호출을 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 에러 시뮬레이션 (개발 시 테스트용)
        // if (Math.random() > 0.8) {
        //   throw new Error('대시보드 데이터를 불러오는데 실패했습니다.');
        // }

        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
        );
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // 존재하지 않는 관리자 권한 체크 (예시)
  const checkAdminPermission = () => {
    // 실제로는 토큰이나 세션을 확인
    const hasAdminPermission = true; // 임시로 true

    if (!hasAdminPermission) {
      notFound(); // not-found.tsx로 리다이렉트
    }
  };

  useEffect(() => {
    checkAdminPermission();
  }, []);

  // 에러가 발생하면 에러를 던져서 error.tsx가 처리하도록
  if (error) {
    throw new Error(error);
  }

  // 로딩 중이면 loading.tsx가 표시되도록
  if (isLoading) {
    return null; // loading.tsx가 대신 표시됨
  }

  const handleMenuClick = async (item: (typeof menuItems)[0]) => {
    try {
      setActiveMenu(item.id);

      // 해당 경로가 존재하는지 미리 확인 (선택사항)
      if (item.path !== '/admin') {
        // 실제 구현에서는 API로 경로 존재 여부 확인
        const routeExists = await checkRouteExists(item.path);
        if (!routeExists) {
          notFound(); // not-found.tsx로 리다이렉트
          return;
        }
      }

      router.push(item.path);
    } catch (error) {
      console.error('메뉴 이동 중 오류:', error);
      // 에러를 던져서 error.tsx가 처리하도록 할 수도 있음
    }
  };

  // 경로 존재 여부 확인 함수 (예시)
  const checkRouteExists = async (path: string): Promise<boolean> => {
    // 실제로는 백엔드 API로 확인
    const validRoutes = [
      '/admin/sales',
      '/admin/products',
      '/admin/brands',
      '/admin/cs',
    ];
    return validRoutes.includes(path);
  };

  return (
    <div className="min-h-screen min-w-[1200px] bg-gray-50">
      {/* 상단 헤더 - PC 최적화 */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="px-8 py-4">
          <div className="mx-auto flex max-w-none items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold text-white">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hobbism 관리자
                </h1>
                <p className="text-sm text-gray-500">백오피스 관리 시스템</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <span>관리자님 안녕하세요</span>
              </div>
              <button className="rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800">
                설정
              </button>
              <button
                onClick={() => router.push('/admin/login')}
                className="rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 사이드바 - PC 최적화 */}
        <aside className="sticky top-0 min-h-screen w-72 border-r bg-white shadow-sm">
          <nav className="p-6">
            <div className="mb-6">
              <h2 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                메뉴
              </h2>
            </div>
            <ul className="space-y-1">
              {menuItems.map(item => (
                <li key={item.id}>
                  <div
                    className={`group flex transform cursor-pointer items-center space-x-3 rounded-xl p-3 transition-all duration-200 hover:scale-[1.02] ${
                      activeMenu === item.id
                        ? 'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    {activeMenu === item.id && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* 사이드바 하단 정보 */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="space-y-2 text-xs text-gray-500">
                <p>버전: v1.0.0</p>
                <p>최근 업데이트: 2024.08.16</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* 메인 콘텐츠 - PC 최적화 */}
        <main className="max-w-none flex-1 overflow-hidden p-8">
          <div className="mx-auto max-w-none">
            {/* 대시보드 헤더 */}
            <div className="animate-fade-in-up mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-gray-900">
                    대시보드
                  </h2>
                  <p className="text-gray-600">전체 현황을 한눈에 확인하세요</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>마지막 업데이트: 방금 전</span>
                </div>
              </div>
            </div>

            {/* 통계 카드들 - PC 최적화 */}
            <div className="mb-8 grid grid-cols-4 gap-8">
              <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center">
                      <div className="mr-3 rounded-lg bg-blue-100 p-2">
                        <span className="text-2xl">📦</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        총 상품수
                      </p>
                    </div>
                    <p className="font-mono text-3xl font-bold text-gray-900">
                      1,234
                    </p>
                    <p className="mt-1 flex items-center text-sm text-green-600">
                      <svg
                        className="mr-1 h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +12% 이번 달
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center">
                      <div className="mr-3 rounded-lg bg-green-100 p-2">
                        <span className="text-2xl">💰</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        이번 달 매출
                      </p>
                    </div>
                    <p className="font-mono text-3xl font-bold text-gray-900">
                      ₩15.4M
                    </p>
                    <p className="mt-1 flex items-center text-sm text-green-600">
                      <svg
                        className="mr-1 h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +8% 지난 달 대비
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center">
                      <div className="mr-3 rounded-lg bg-yellow-100 p-2">
                        <span className="text-2xl">🏢</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        등록 브랜드
                      </p>
                    </div>
                    <p className="font-mono text-3xl font-bold text-gray-900">
                      87
                    </p>
                    <p className="mt-1 flex items-center text-sm text-blue-600">
                      <svg
                        className="mr-1 h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +3 신규 등록
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center">
                      <div className="mr-3 rounded-lg bg-red-100 p-2">
                        <span className="text-2xl">🎧</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        미처리 문의
                      </p>
                    </div>
                    <p className="font-mono text-3xl font-bold text-gray-900">
                      23
                    </p>
                    <p className="mt-1 flex items-center text-sm text-red-600">
                      <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                      처리 필요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 빠른 액션 및 최근 활동 */}
            <div className="grid grid-cols-3 gap-8">
              {/* 빠른 액션 버튼들 */}
              <div className="col-span-2">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  빠른 작업
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Link href="/admin/products/new">
                    <div className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-100">
                          <span className="text-2xl">➕</span>
                        </div>
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          새 상품 등록
                        </h4>
                        <p className="text-sm text-gray-600">
                          새로운 상품을 등록하세요
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/admin/brands/new">
                    <div className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                          <span className="text-2xl">🏪</span>
                        </div>
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-green-600">
                          브랜드 등록
                        </h4>
                        <p className="text-sm text-gray-600">
                          새로운 브랜드를 등록하세요
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/admin/cs">
                    <div className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-lg">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 transition-colors group-hover:bg-yellow-100">
                          <span className="text-2xl">📋</span>
                        </div>
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-yellow-600">
                          CS 처리
                        </h4>
                        <p className="text-sm text-gray-600">
                          고객 문의를 처리하세요
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* 최근 활동 */}
              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  최근 활동
                </h3>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="group -mx-2 flex items-start space-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm">📦</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          LEGO Creator Expert 상품이 등록되었습니다
                        </p>
                        <p className="text-xs text-gray-500">5분 전</p>
                      </div>
                    </div>

                    <div className="group -mx-2 flex items-start space-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <span className="text-sm">🏢</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          Tamiya 브랜드 정보가 업데이트되었습니다
                        </p>
                        <p className="text-xs text-gray-500">1시간 전</p>
                      </div>
                    </div>

                    <div className="group -mx-2 flex items-start space-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm">💬</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          새로운 고객 문의 3건이 접수되었습니다
                        </p>
                        <p className="text-xs text-gray-500">2시간 전</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <Link
                      href="/admin/activity"
                      className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                    >
                      전체 활동 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

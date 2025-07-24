'use client';

import { BackButton } from '@/components/common/BackButton';
import SearchButton from '@/components/common/SearchHeader';
import { SettingButton } from '@/components/common/SettingButton';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { Pencil, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useMemo } from 'react';

//          component: 헤더 컴포넌트          //
export default function Header() {
  //          state: 로그인 유저 정보 가져오기          //
  const { user } = useAuthStore();

  //          state: 현재 경로(pathname) 가져오기          //
  const pathname = usePathname();

  //          state: 경로에 따른 페이지 상태          //
  const isUserPage = useMemo(() => /^\/user\/\d+/.test(pathname), [pathname]); // 유저 상세 페이지
  const isFollowPage = useMemo(
    () => /^\/user\/\d+\/follow/.test(pathname),
    [pathname],
  ); // 팔로우 페이지
  const isBookmarkPage = useMemo(
    () => /^\/user\/\d+\/bookmark/.test(pathname),
    [pathname],
  ); // 북마크 페이지
  const isProductPage = useMemo(
    () => /^\/shop\/\d+/.test(pathname),
    [pathname],
  ); // 제품 상세 페이지
  const isFeedPage = useMemo(
    () => /^\/community\/\d+/.test(pathname),
    [pathname],
  ); // 제품 상세 페이지

  //          state: 고정 경로 페이지 상태          //
  const isLoginPage = pathname === '/login'; // 로그인 페이지
  const isShopPage = pathname === '/shop'; // 쇼핑 메인
  const isCommunityPage = pathname === '/community'; // 커뮤니티 메인
  const isCommunityWritePage = pathname === '/community/write'; // 커뮤니티 작성 페이지
  const isSettingPage = pathname === '/user/setting'; // 설정 페이지
  const isEditPage = pathname === '/user/edit'; // 프로필 수정 페이지
  const isCartPage = pathname === '/shop/cart'; // 장바구니 페이지
  const isTermsPage = pathname === '/terms'; // 약관 페이지
  const isPolicyPage = pathname === '/policy'; // 개인정보 처리방침 페이지
  const isNoticePage = pathname === '/notice'; // 공지사항 페이지
  const isContactPage = pathname === '/contact'; // 고객센터 페이지
  const isCharacterPage = pathname === '/character'; // 고객센터 페이지
  const isSearchPage = pathname.startsWith('/search');
  const isLivePage = pathname === '/live';

  //          state: 현재 페이지가 내 마이페이지인지 여부          //
  const isMypage = user && pathname === `/user/${user._id}`;

  //          logic: 헤더 조건 처리 (렌더링 조건)          //
  const showLogo = isCommunityPage || isShopPage || isCharacterPage; // 로고 노출 여부
  const showBackButton =
    isSettingPage ||
    isCartPage ||
    isFollowPage ||
    isProductPage ||
    isTermsPage ||
    isPolicyPage ||
    isNoticePage ||
    isContactPage ||
    (isUserPage && !isMypage) ||
    isFeedPage ||
    isLivePage ||
    isBookmarkPage; // 일반 뒤로가기 버튼 노출 조건
  const showConfirmBackButton = isEditPage || isCommunityWritePage; // 뒤로가기 시 확인이 필요한 페이지
  const showCartIcon = isShopPage || isProductPage; // 쇼핑카트 아이콘 노출 조건

  //          render: 로그인 페이지에서는 헤더 숨김 처리          //
  if (isLoginPage) return null;

  //          render: 헤더 컴포넌트 렌더링          //
  return (
    <header className={cn('h-12 w-full')}>
      <div className="fixed top-0 z-50 flex min-h-12 w-full max-w-[600px] items-center bg-white">
        <div className="relative flex w-full items-center">
          {/* 왼쪽 영역 */}
          <div className="absolute left-4 flex items-center">
            {showLogo && (
              <Image
                src="/images/inhwan/logo-H.svg"
                alt="로고"
                width={24}
                height={24}
              />
            )}
            {showBackButton && <BackButton />}
            {showConfirmBackButton && <BackButton needConfirm />}
          </div>

          {/* 가운데 타이틀 영역 */}
          <h3 className="flex w-full items-center justify-center text-lg font-medium">
            {isCommunityPage && '커뮤니티'}
            {isCommunityWritePage && '피드등록'}
            {isSettingPage && '설정'}
            {isEditPage && '프로필 수정'}
            {isCartPage && '장바구니'}
            {isProductPage && '제품 상세'}
            {isBookmarkPage && '게시물 북마크'}
            {isFeedPage && '피드보기'}
            {isCharacterPage && '나의 캐릭터'}
            {isLivePage && '라이브'}
          </h3>

          {/* 오른쪽 아이콘 영역 */}
          <div className="absolute right-4 flex gap-6">
            {(isShopPage || isSearchPage) && (
              <Suspense>
                <SearchButton />
              </Suspense>
            )}
            {showCartIcon && (
              <Link href="/shop/cart">
                <ShoppingCart />
              </Link>
            )}
            {isUserPage && isMypage && <SettingButton />}
            {isCommunityPage && (
              <Link href="/community/write">
                <Pencil size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

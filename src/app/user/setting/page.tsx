'use client';

import { Separator } from '@/components/ui/separator';

import {
  Bell,
  BookAlert,
  ChevronRight,
  Headset,
  Megaphone,
  Moon,
  Scroll,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

import AddressForm from '@/components/features/user/setting/AddressForm';
import { UserLoginInfo } from '@/components/features/user/setting/LoginInfo';
import { LogoutButton } from '@/components/features/user/setting/LogoutButton';
import { useState } from 'react';
import { useBannerStore } from '@/store/Banner.store';

export default function SettingPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'on' | 'off' | null>(null);
  const showBanner = useBannerStore(state => state.showBanner);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    useBannerStore.getState().setShowBanner(e.target.checked);

    setToastType(e.target.checked ? 'on' : 'off');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100%-48px)] flex-col">
      <main className="scrollbar-hide flex h-full flex-col gap-2 overflow-y-scroll p-5">
        <section>
          <p>일반</p>
          <div className="flex flex-col gap-3 rounded-[8px] border">
            <ul className="px-3">
              <UserLoginInfo />
              <Separator />
              <AddressForm />
            </ul>
          </div>
        </section>

        <section>
          <p>일반</p>
          <div className="flex flex-col gap-3 rounded-[8px] border">
            <ul className="px-3">
              <li className="flex items-center gap-2.5 py-4">
                <Moon />
                <span className="flex-1">다크모드</span>
                <input type="checkbox" id="dark" className="custom-toggle" />
              </li>
              <Separator />
              <li className="flex items-center gap-2.5 py-4">
                <Bell />
                <span className="flex-1">알림 수신</span>
                <input
                  type="checkbox"
                  className="custom-toggle"
                  checked={showBanner ?? false}
                  onChange={handleToggle}
                />
              </li>
            </ul>
          </div>
        </section>
        <section>
          <p>공지</p>
          <div className="flex flex-col gap-3 rounded-[8px] border">
            <ul className="px-3">
              <li>
                <Link
                  href="/notice"
                  prefetch={true}
                  className="flex items-center gap-2.5 py-4"
                >
                  <Megaphone />
                  <span className="flex-1">공지사항</span>
                  <ChevronRight />
                </Link>
              </li>
              <Separator />
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="flex items-center gap-2.5 py-4"
                >
                  <Headset />
                  <span className="flex-1">고객센터</span>
                  <ChevronRight />
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <p>약관 및 정책</p>
          <div className="flex flex-col gap-3 rounded-[7px] border">
            <ul className="px-3">
              <li>
                <Link
                  href="/terms"
                  prefetch={true}
                  className="flex items-center gap-2.5 py-4"
                >
                  <Scroll />
                  <span className="flex-1">서비스 이용약관</span>
                  <ChevronRight />
                </Link>
              </li>
              <Separator />
              <li>
                <Link
                  href="/policy"
                  prefetch={true}
                  className="flex items-center gap-2.5 py-4"
                >
                  <BookAlert />
                  <span className="flex-1">개인정보 처리방침</span>
                  <ChevronRight />
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <LogoutButton />
      </main>
      {showToast && toastType === 'on' && (
        <div className="mx-auto mt-4 flex h-15 items-center gap-x-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 shadow-lg">
          <ShieldCheck className="text-green-600" />
          <p className="text-sm text-green-800">
            이벤트 및 혜택 알림 수신에 동의하셨습니다.
          </p>
        </div>
      )}
      {showToast && toastType === 'off' && (
        <div className="mx-auto mt-4 flex h-15 items-center gap-x-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 shadow-lg">
          <ShieldAlert className="text-red-600" />
          <p className="text-sm text-red-800">
            이벤트 및 혜택 알림 수신이 해제되었습니다.
          </p>
        </div>
      )}
    </div>
  );
}

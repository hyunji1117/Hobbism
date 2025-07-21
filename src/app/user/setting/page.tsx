'use client';
import { BackButton } from '@/components/common/BackButton';
import { HeaderNav } from '@/components/layout/header/Header';
import { Separator } from '@/components/ui/separator';

import {
  Bell,
  BookAlert,
  ChevronRight,
  Headset,
  LogOut,
  Map,
  Megaphone,
  Moon,
  Scroll,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';

export default function SettingPage() {
  return (
    <div className="flex h-full flex-col">
      <HeaderNav>
        <HeaderNav.LeftContent>
          <BackButton />
        </HeaderNav.LeftContent>
        <HeaderNav.Title>설정</HeaderNav.Title>
      </HeaderNav>
      <main className="flex h-full flex-col gap-2 p-5">
        <section>
          <p>일반</p>
          <div className="flex flex-col gap-3 rounded-[8px] border">
            <ul className="px-3">
              <li className="flex items-center gap-2.5 py-4">
                <UserRound />
                <span className="flex-1">간편 로그인 설정</span>
              </li>
              <Separator />
              <li className="flex items-center gap-2.5 py-4">
                <Map />
                <span className="flex-1">배송지 관리</span>
                <ChevronRight />
              </li>
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
                <input type="checkbox" className="custom-toggle" />
              </li>
            </ul>
          </div>
        </section>
        <section>
          <p>화면</p>
          <div className="flex flex-col gap-3 rounded-[8px] border">
            <ul className="px-3">
              <li className="flex items-center gap-2.5 py-4">
                <Megaphone />
                <span className="flex-1">공지사항</span>
                <ChevronRight />
              </li>
              <Separator />
              <li className="flex items-center gap-2.5 py-4">
                <Headset />
                <span className="flex-1">고객센터</span>
                <ChevronRight />
              </li>
            </ul>
          </div>
        </section>
        <section>
          <p>화면</p>
          <div className="flex flex-col gap-3 rounded-[7px] border">
            <ul className="px-3">
              <li className="flex items-center gap-2.5 py-4">
                <Scroll />
                <span className="flex-1">서비스 이용약관</span>
                <ChevronRight />
              </li>
              <Separator />
              <li>
                <Link
                  href="/"
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
        <button className="flex w-full cursor-pointer gap-2.5 rounded-[8px] border bg-white p-3">
          <LogOut />
          <span>로그아웃</span>
        </button>
      </main>
    </div>
  );
}

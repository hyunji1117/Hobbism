'use client';

import { useAuthStore } from '@/store/auth.store';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const modalContent = [
  {
    image: '/ad-notice.png',
    href: '/notice',
    width: 1703,
    height: 1331,
  },
  {
    image: '/ad-live.png',
    href: '/live',
    width: 970,
    height: 1455,
  },
  {
    image: '/ad-character.png',
    href: '/character',
    width: 1703,
    height: 1331,
  },
  {
    image: '/ad-community.png',
    href: '/community',
    width: 1488,
    height: 1488,
  },
  {
    image: '/ad-shop.png',
    href: '/shop',
    width: 2207,
    height: 1551,
  },
];

export default function RandomModal({ onClose }: { onClose: () => void }) {
  const [randomModal] = useState(() =>
    Math.floor(Math.random() * modalContent.length),
  );
  const { image, href, width, height } = modalContent[randomModal];
  const { user } = useAuthStore();
  const [dontShowToday, setDontShowToday] = useState(false);

  // 오늘 하루 보지 않기 적용
  const handleTodayClose = () => {
    if (dontShowToday) {
      const expire = new Date();
      expire.setHours(23, 59, 59, 999);
      localStorage.setItem(
        `hideRandomModal_${user?._id}`,
        expire.getTime().toString(),
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 광고 모달 */}
      <div className="relative mx-4 flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-0 shadow-xl">
        <Link href={href} prefetch={true}>
          <Image
            src={image}
            alt="광고 이미지"
            width={width}
            height={height}
            className="mx-auto block rounded-t-2xl"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              background: '#fff',
              display: 'block',
            }}
            priority
          />
        </Link>
        <div className="flex w-full items-center justify-between px-6 py-2">
          <label
            htmlFor="modal-check"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              id="modal-check"
              checked={dontShowToday}
              onChange={e => setDontShowToday(e.target.checked)}
              className="h-5 w-5 accent-[#FE508B]"
            />
            <span className="text-base text-gray-700 select-none">
              오늘 하루 보지 않기
            </span>
          </label>
          <button
            type="button"
            onClick={handleTodayClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
            aria-label="닫기"
          >
            <X size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

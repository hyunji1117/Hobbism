'use client';

import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { HOBBY_ITEMS } from '@/constant/hobby';
import { ITEM_DATA } from '@/constant/item';
import { useItemStore } from '@/store/item.store';
import { usePointStore } from '@/store/point';
import { User } from '@/types';
import { getLevelInfo } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  user: Pick<User, 'extra'>;
}

export default function ChracterPageClient({ user }: Props) {
  const { equippedItems, setEquippedItems, setOwnedItems } = useItemStore();

  const { point, setPoint } = usePointStore();

  const hobbyTitle =
    HOBBY_ITEMS.find(item => item.code === user.extra?.hobby)?.title ??
    '취미 없음';

  const levelInfo = getLevelInfo(user.extra?.total_point || 0);

  useEffect(() => {
    if (user.extra?.equippedItemCodes) {
      setEquippedItems(user.extra.equippedItemCodes);
    }
    if (user.extra?.ownedItemCodes) {
      setOwnedItems(user.extra.ownedItemCodes);
    }
    if (user.extra?.point) {
      setPoint(user.extra.point);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.extra?.equippedItemCodes]);

  return (
    <>
      {equippedItems.map(code => {
        const item = ITEM_DATA[code];
        return (
          <Image
            key={code}
            src={item.image}
            alt={item.name}
            width={item.width}
            height={item.height}
            className="absolute"
            style={{
              top: `${item.position.top}%`,
              left: `${item.position.left}%`,
              width: `${item.position.width}%`,
              zIndex: item.z ?? 1,
            }}
          />
        );
      })}

      <Link href="/hobby" className="absolute right-4">
        <Image
          src="/images/woomin/hobby.png"
          alt="취미 아이콘"
          width={48}
          height={48}
        />
        <span className="text-sm text-gray-500 select-none">취미선택</span>
      </Link>
      <div className="h-24"></div>
      <div className="z-40 flex flex-1 flex-col items-center justify-center p-4">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full border-2 border-black bg-white px-6 py-2">
            <span className="text-center text-base font-semibold">
              {'테스트 해봐야지'}
            </span>
            <div className="absolute -bottom-[20px] left-1/2 h-0 w-0 -translate-x-1/2 border-10 border-transparent border-t-black"></div>
            <div className="absolute -bottom-[17px] left-1/2 h-0 w-0 -translate-x-1/2 border-10 border-transparent border-t-white"></div>
          </div>
          <Image
            src={'/images/woomin/character-test-4.webp'}
            alt="테스트입니두"
            width={350}
            height={350}
            className="w-3/5 cursor-pointer"
          />

          <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm">
            <span>{levelInfo.name}</span>
            <span>{user.extra?.nickname}</span>
          </div>
        </div>
      </div>

      <div className="relative mx-4 mb-12 flex w-[calc(100%-32px)] flex-col gap-3 rounded-lg border bg-white p-4">
        <Progress
          value={levelInfo.progress}
          className="bg-primary/5 absolute -top-6 right-0 left-0 h-3.5"
          indicatorClassName="bg-gradient-to-r from-[#CDD6A0] via-[#98B87E] to-[#3B673A]"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-sm font-normal whitespace-pre-line text-gray-600 select-none">
              현재 나의 레벨
            </p>
            <p className="text-sm font-normal whitespace-pre-line select-none">
              {levelInfo.level}
            </p>
          </div>
          <p className="text-sm font-normal whitespace-pre-line select-none">
            {`나의 취미 : ${hobbyTitle}`}
          </p>
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base whitespace-pre-line text-gray-600 select-none">
              보유한 포인트
            </p>
            <Image
              src="/images/woomin/point-test.png"
              alt="포인트"
              width={32}
              height={32}
            />

            <p className="flex items-center gap-2 text-base text-[22px] whitespace-pre-line text-gray-900 select-none">
              <span className="text-gray-500 select-none">{point || 0}</span>/
              <span className="text-gray-900 select-none">
                {user.extra?.total_point || 0}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

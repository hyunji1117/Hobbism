'use client';

import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { HOBBY_ITEMS } from '@/constant/hobby';
import { ITEM_DATA } from '@/constant/item';
import { CHARACTER_MESSAGES } from '@/constant/message';
import { useItemStore } from '@/store/item.store';
import { usePointStore } from '@/store/point';
import { User } from '@/types';
import { getLevelInfo } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

//         interface: CharacterPageClient component properties          //
interface Props {
  extra: User['extra'];
}

//          component: 캐릭터 페이지(클라이언트)          //
export default function ChracterPageClient({ extra }: Props) {
  //          state: 포인트 상태          //
  const { point, setPoint } = usePointStore();
  //          state: 장착 아이템 상태          //
  const { equippedItems, setEquippedItems, setOwnedItems } = useItemStore();
  //          state: 메세지 인덱스 상태          //
  const [messageIndex, setMessageIndex] = useState(0);

  const handleCharacterClick = () => {
    setMessageIndex(prev => (prev + 1) % CHARACTER_MESSAGES.length);
  };

  const hobbyTitle =
    HOBBY_ITEMS.find(item => item.code === extra?.hobby)?.title ?? '취미 없음';

  const levelInfo = getLevelInfo(extra?.total_point || 0);

  useEffect(() => {
    if (extra?.equippedItemCodes) {
      setEquippedItems(extra.equippedItemCodes);
    }
    if (extra?.ownedItemCodes) {
      setOwnedItems(extra.ownedItemCodes);
    }
    if (extra?.point) {
      setPoint(extra.point);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extra?.equippedItemCodes]);

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
            priority
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
          src="/images/etc/hobby.webp"
          alt="취미 아이콘"
          width={48}
          height={48}
        />
        <span className="text-sm text-gray-500 select-none">취미선택</span>
      </Link>

      <div className="z-40 mt-20 flex flex-1 flex-col items-center justify-center p-4">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full border-2 border-[#6A706E] bg-white px-6 py-2 text-[#4A4A4A]">
            <span className="text-center text-base font-semibold">
              {CHARACTER_MESSAGES[messageIndex]}
            </span>
            <div className="absolute -bottom-[20px] left-1/2 h-0 w-0 -translate-x-1/2 border-10 border-transparent border-t-[#6A706E]"></div>
            <div className="absolute -bottom-[17px] left-1/2 h-0 w-0 -translate-x-1/2 border-10 border-transparent border-t-white"></div>
          </div>
          <Image
            src={'/images/character/character-normal.webp'}
            alt="캐릭터"
            width={350}
            height={350}
            priority
            className="w-3/5 cursor-pointer"
            onClick={handleCharacterClick}
          />

          <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm text-[#4a4a4a]">
            <span>{levelInfo.name}</span>
            <span className="font-semibold">{extra?.nickname || '-'}</span>
          </div>
        </div>
      </div>

      <div className="relative z-50 mx-4 mb-12 flex w-[calc(100%-32px)] flex-col gap-2 rounded-lg border bg-white p-4">
        <Progress
          value={levelInfo.progress}
          className="bg-primary/5 absolute -top-6 right-0 left-0 z-50 h-3.5"
          indicatorClassName="bg-gradient-to-r from-[#CDD6A0] via-[#98B87E] to-[#3B673A]"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-sm font-normal whitespace-pre-line text-gray-600 select-none">
              현재 나의 레벨
            </p>
            <p className="text-sm font-normal whitespace-pre-line text-[#3B673A] select-none">
              {levelInfo.level}
            </p>
          </div>
          <p className="text-sm font-normal whitespace-pre-line select-none">
            <span>나의 취미 : </span>
            <span className="font-semibold text-[#3B673A]">{`${hobbyTitle}`}</span>
          </p>
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base whitespace-pre-line text-gray-600 select-none">
              보유한 포인트
            </p>
            <Image
              src="/images/etc/point.webp"
              alt="포인트"
              width={30}
              height={30}
            />

            <p className="flex items-center gap-2 text-xl whitespace-pre-line text-[#4a4a4a] select-none">
              <span className="text-gray-500 select-none">{point || 0}</span>/
              <span className="text-gray-900 select-none">
                {extra?.total_point || 0}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

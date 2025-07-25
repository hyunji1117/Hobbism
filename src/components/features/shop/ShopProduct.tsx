'use client';

import { LiveProgress } from '@/components/features/live/LiveProgress';
import { useLiveStore } from '@/store/live.store';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface ShopProductProps {
  _id: number;
  price: number;
  name: string;
  mainImageSrc: string;
  category: string[];
  discountRate: number;
  discountPrice: number;
  recommendedBy: string;
  textPrice: string;
  liveTitle: string;
  liveRate: number;
  livePrice: number;
}

export const ShopProduct = ({
  _id,
  price,
  name,
  mainImageSrc,
  discountRate,
  recommendedBy,
  discountPrice,
  textPrice,
  liveTitle,
  liveRate,
  livePrice,
}: ShopProductProps) => {
  const recommendKr: Record<string, string> = {
    inhwan: '인환',
    hyunji: '현지',
    woomin: '우민',
    youngchan: '영찬',
    ayoung: '아영',
  };
  const recommendKrName = recommendKr[recommendedBy];

  const recommendColorCode: Record<string, string> = {
    inhwan: 'bg-[#FE508B]',
    hyunji: 'bg-[#FAB91D]',
    woomin: 'bg-[#51AAED]',
    youngchan: 'bg-[#D2E308]',
    ayoung: 'bg-[#6E67DA]',
  };
  const recommendColor = recommendColorCode[recommendedBy];

  // fetchLive 호출
  const fetchLive = useLiveStore(state => state.fetchLive);
  useEffect(() => {
    fetchLive();
  }, []);

  const currentLive = useLiveStore(state => state.currentLive);

  const now = moment();

  const isLive = currentLive.some(product => {
    if (product._id !== _id) return false;

    const start = moment(product.start);
    const end = moment(product.end);

    return now.isBetween(start, end);
  });

  return (
    <Link
      href={isLive ? '/live' : `/shop/${_id}`}
      className={`mb-2 flex w-full flex-col gap-1`}
    >
      {isLive && (
        <div className="absolute top-2 -left-2 z-5">
          <LiveProgress />
        </div>
      )}
      <div className={`relative mb-1 aspect-square w-full`}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src={`https://fesp-api.koyeb.app/market/${mainImageSrc}`}
          alt={`/${mainImageSrc}`}
          sizes="100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          className="pointer-events-none rounded-xl"
        />
      </div>

      <div className="flex max-w-full gap-2 text-wrap">
        <p className="pointer-events-none overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
          {name}
        </p>

        {recommendedBy && (
          <span
            className={`${recommendColor} pointer-events-none flex items-center rounded-sm px-2 text-[8px] whitespace-nowrap text-white`}
          >
            {recommendKrName}PICK
          </span>
        )}
      </div>
      <p className={`${textPrice} font-semibold`}>
        {discountRate && (
          <span className="sale pointer-events-none mr-1 text-[#FE508B]">
            {isLive ? liveRate : discountRate}%
          </span>
        )}
        {isLive ? livePrice : discountPrice ? discountPrice : price}원
      </p>
    </Link>
  );
};

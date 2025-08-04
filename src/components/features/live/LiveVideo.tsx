'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export const LiveVideo = ({
  livePath,
  _id,
  name,
  rate,
  imgSrc,
  price,
  isLiveNow,
}: {
  livePath: string;
  _id: number;
  name: string;
  rate: number;
  imgSrc: string;
  price: number;
  isLiveNow: boolean;
}) => {
  const isNotLive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLiveNow) {
      e.preventDefault();
      toast.error('이미 라이브 완료된 상품입니다.');
      return;
    }
  };

  return (
    <div className="relative mx-auto h-full w-full md:w-full">
      {/* 상품 설명, 제품 보기 링크 */}
      <div className="absolute top-[calc(73%)] z-1 ml-2 flex w-[50%] max-w-[200px] items-center justify-between rounded-md bg-white opacity-90">
        <span className="flex items-center">
          <div className={`relative aspect-square w-13`}>
            <Image
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              src={`${imgSrc}`}
              alt={imgSrc}
              sizes="100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              className="pointer-events-none rounded-l-md"
            />
          </div>
          <div className="ml-1 text-[10px]">
            <p>{name}</p>
            <p className="font-bold">
              <span>{rate}%</span>
              {price}
            </p>
          </div>
        </span>
        <span>
          <Link onClick={e => isNotLive(e)} href={`/shop/${_id}`}>
            <ChevronRight />
          </Link>
        </span>
      </div>
      {/* 라이브 영상 */}
      {/* 자동재생 방법: &autoplay=1&mute=1, 대부분의 브라우저에서 자동재생을 음소거 상태에서만 제공 */}
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${livePath}&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

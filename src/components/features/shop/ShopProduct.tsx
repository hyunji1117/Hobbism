'use client';

import Image from 'next/image';
import Link from 'next/link';

export const ShopProduct = ({ wid }: { wid: string }) => {
  return (
    <Link
      href={'/shop/productId'}
      className={`flex ${wid} mb-2 flex-col gap-1`}
    >
      <div className={`relative mb-1 aspect-square w-full`}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src="/images/ayoung/products/dress/ankrouge-03-01.webp"
          alt="ankrouge"
          className="pointer-events-none rounded-xl"
        />
      </div>

      <div className="flex max-w-full gap-1 text-wrap">
        <p className="pointer-events-none overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
          앙크루즈 본 보잉 리본 x Ank Rouge 콜라보 숄더백 가방
        </p>
        <span className="pointer-events-none flex items-center rounded-sm bg-[#FE508B] px-2 text-[8px] whitespace-nowrap text-white">
          아영PICK
        </span>
      </div>
      <p className="text-base font-extrabold">
        <span className="sale pointer-events-none text-[#FE508B]">1%</span>{' '}
        187,400원
      </p>
    </Link>
  );
};

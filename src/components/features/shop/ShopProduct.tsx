'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ShopProductProps {
  price: number;
  name: string;
  mainImageSrc: string;
  category: string[];
  isLiveSpecial: boolean;
  discountRate: number;
  discountPrice: number;
}

export const ShopProduct = ({
  price,
  name,
  mainImageSrc,
  category,
  isLiveSpecial,
  discountRate,
  discountPrice,
}: ShopProductProps) => {
  return (
    <Link
      href={'/shop/productId'}
      className={`mb-2 flex w-full flex-col gap-1`}
    >
      <div className={`relative mb-1 aspect-square w-full`}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src={`/${mainImageSrc}`}
          alt={`/${mainImageSrc}`}
          className="pointer-events-none rounded-xl"
        />
      </div>

      <div className="flex max-w-full gap-1 text-wrap">
        <p className="pointer-events-none overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
          {name}
        </p>
        <span className="pointer-events-none flex items-center rounded-sm bg-[#FE508B] px-2 text-[8px] whitespace-nowrap text-white">
          아영PICK
        </span>
      </div>
      <p className="text-base font-semibold">
        {discountRate && (
          <span className="sale pointer-events-none text-[#FE508B]">
            {discountRate}%
          </span>
        )}
        {discountPrice ? discountPrice : price}원
      </p>
    </Link>
  );
};

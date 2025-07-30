'use client';

import { Item } from '@/types';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import Image from 'next/image';

interface ItemCardProps {
  item: Item;
  isOwned: boolean;
  isEquipped: boolean;
  onClick: () => void;
}

export default function ItemCard({
  item,
  isOwned,
  isEquipped,
  onClick,
}: ItemCardProps) {
  return (
    <div className="flex cursor-pointer flex-col gap-2" onClick={onClick}>
      <div
        className={cn(
          'relative flex aspect-square items-center justify-center rounded-xl bg-gray-100 py-2.5',
          isEquipped && 'ring-2 ring-gray-500',
        )}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="177.33px"
          priority
          className={cn(
            'object-contain p-2',
            !isOwned && 'brightness-[0.5] contrast-0 grayscale',
          )}
        />
        {!isOwned && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl">
            <Lock size={32} className="text-white" />
          </div>
        )}
      </div>
      <p className="text-center text-sm font-semibold text-gray-700 select-none">
        {item.name}
      </p>
    </div>
  );
}

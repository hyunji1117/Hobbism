'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {
  onClickBack?: () => void;
  className?: string;
};

export const BackButton = ({ onClickBack, className }: BackButtonProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className={cn('cursor-pointer', className)}
    >
      <ChevronLeft />
    </button>
  );
};

'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';
import ConfirmModal from '@/components/common/ConfirmModal';

interface BackButtonProps {
  onClickBack?: () => void;
  className?: string;
  needConfirm?: boolean;
}

export const BackButton = ({
  onClickBack,
  className,

  needConfirm,
}: BackButtonProps) => {
  const router = useRouter();
  const { openModal } = useModalStore();

  const handleBackClick = () => {
    if (onClickBack) return onClickBack();

    if (needConfirm) {
      openModal(({ onClose }) => (
        <ConfirmModal onClose={onClose} onConfirm={() => router.back()} />
      ));
      return;
    }

    router.back();
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

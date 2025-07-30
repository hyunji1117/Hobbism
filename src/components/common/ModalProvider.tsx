'use client';

import { useModalStore } from '@/store/modal.store';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ModalProvider() {
  const { modals, closeModal, clearModals } = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    clearModals();
  }, [clearModals, pathname]);

  return (
    <>
      {modals.map((Modal, index) => {
        return <Modal key={index} onClose={() => closeModal(index)} />;
      })}
    </>
  );
}

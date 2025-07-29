'use client';

import { useModalStore } from '@/store/modal.store';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ModalProvider() {
  const { modals, closeModal, clearModals } = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    clearModals();
    console.log('modals', modals);
  }, [clearModals, pathname]);

  return (
    <>
      {modals.map((Modal, index) => {
        console.log('modal index:', index);
        return <Modal key={index} onClose={() => closeModal(index)} />;
      })}
    </>
  );
}

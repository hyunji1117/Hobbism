'use client';

import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';

interface Props {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <ModalBackdrop />
      <ModalPanel className="w-80 px-6 py-8 text-center">
        <h2 className="text-lg font-semibold">프로필 수정 완료</h2>
        <p className="mt-2 text-sm text-gray-500">
          잠시 후 마이페이지로 이동합니다.
        </p>
      </ModalPanel>
    </Modal>
  );
}

import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';

interface ConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal onClose={onClose}>
      <ModalBackdrop />

      <ModalPanel className="w-[300px] p-6 text-center">
        <div className="mb-4 text-center text-sm">
          <p>작성 중인 내용은 저장되지 않습니다</p>
          <p>정말 나가시겠습니까?</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg bg-gray-200 py-2"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-lg bg-black py-2 text-white"
          >
            확인
          </button>
        </div>
      </ModalPanel>
    </Modal>
  );
}

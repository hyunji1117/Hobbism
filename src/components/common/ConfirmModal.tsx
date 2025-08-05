import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';
import { Separator } from '@/components/ui/separator';

interface ConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  label: string;
}

export default function ConfirmModal({
  onConfirm,
  onClose,
  label,
}: ConfirmModalProps) {
  return (
    <Modal key={'confitem-modal'} onClose={onClose}>
      <ModalBackdrop />

      <ModalPanel className="mx-6 w-[400px] px-6 py-4 text-center text-[#1A1A1A]">
        <div className="my-6 flex flex-col gap-2 text-center">
          <p className="">{`${label} 그만두시겠어요?`}</p>
          <p className="text-sm text-gray-500">작성 중인 내용이 삭제됩니다</p>
        </div>
        <div className="flex h-10 gap-2">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer py-2 font-medium"
          >
            아니요
          </button>
          <div className="flex h-full items-center justify-center py-3">
            <Separator orientation="vertical" className="bg-gray-300" />
          </div>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer py-2 font-medium"
          >
            네 그만둘래요
          </button>
        </div>
      </ModalPanel>
    </Modal>
  );
}

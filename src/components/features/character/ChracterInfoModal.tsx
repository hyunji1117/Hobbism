'use client';
import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function CharacterInfoModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <ModalBackdrop />
      <ModalPanel className="w-80 p-6 text-center text-[#4a4a4a]">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-semibold whitespace-pre-line text-[#4a4a4a] select-none">
            취미로 방을 가득채워보세요
          </p>
          <p className="whitespace-pre-line text-gray-900 select-none">
            포인트를 획득하고 아이템을 구매하세요
          </p>
          <div className="scrollbar-hide w-full overflow-y-scroll">
            <h3 className="mt-4 mb-1 text-left font-semibold">
              레벨 기준 (누적 포인트)
            </h3>
            <ul className="space-y-1 text-left">
              <li>LV1: 0P 이상 - 일덕</li>
              <li>LV2: 500P 이상 - 이덕</li>
              <li>LV3: 1200P이상 - 삼덕</li>
              <li>LV4: 2000P 이상 - 사덕</li>
              <li>LV5: 3000P 이상 - 오덕</li>
              <li>LV6: 4500P 이상 - 육덕</li>
              <li>LV7: 6500P 이상 - 칠덕</li>
              <li>LV8: 9000P 이상 - 팔덕</li>
              <li>LV9: 12000P 이상 - 구덕</li>
              <li>LV10: 16000P 이상 - 십덕</li>
            </ul>
          </div>
        </div>
        <X
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />
      </ModalPanel>
    </Modal>
  );
}

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
      <ModalPanel className="w-80 p-6 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-semibold whitespace-pre-line text-gray-900 select-none">
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
              <li>LV1: 0 ~ 49P - 일덕</li>
              <li>LV2: 50 ~ 149P - 이덕</li>
              <li>LV3: 150 ~ 299P - 삼덕</li>
              <li>LV4: 300 ~ 599P - 사덕</li>
              <li>LV5: 600 ~ 999P - 오덕</li>
              <li>LV6: 1000 ~ 1499P - 육덕</li>
              <li>LV7: 1500 ~ 2199P - 칠덕</li>
              <li>LV8: 2200 ~ 3199P - 팔덕</li>
              <li>LV9: 3200 ~ 3999P - 구덕</li>
              <li>LV10: 4000p 이상 - 십덕</li>
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

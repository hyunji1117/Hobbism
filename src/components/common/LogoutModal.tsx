'use client';

import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth.store';
import { signOut } from 'next-auth/react';

interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const resetUser = useAuthStore(state => state.clearAuth);

  const handleLogout = async () => {
    resetUser();
    sessionStorage.clear();
    localStorage.removeItem('userInfo-storage');

    await signOut({ callbackUrl: '/' });
  };

  return (
    <Modal key={'logout-modal'} onClose={onClose}>
      <ModalBackdrop />
      <ModalPanel className="mx-6 w-[400px] px-6 py-4 text-center text-[#1A1A1A]">
        <div className="my-6 flex flex-col gap-2 text-center">
          <p className="">로그아웃 하시겠어요?</p>
        </div>
        <div className="flex h-10 gap-2">
          {/* 아니오 버튼 */}
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer py-2 font-medium text-gray-400 hover:text-gray-600"
          >
            아니요
          </button>
          {/* 버튼 구분 선 */}
          <div className="flex h-full items-center justify-center py-3">
            <Separator orientation="vertical" className="bg-gray-300" />
          </div>
          {/* 예 버튼 */}
          <button
            onClick={handleLogout}
            className="flex-1 cursor-pointer py-2 font-medium hover:text-gray-600"
          >
            네, 로그아웃할게요
          </button>
        </div>
      </ModalPanel>
    </Modal>
  );
}

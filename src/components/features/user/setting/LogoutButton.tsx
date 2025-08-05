'use client';

import LogoutModal from '@/components/common/LogoutModal';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export function LogoutButton() {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        className="flex w-full cursor-pointer gap-2.5 rounded-[8px] border bg-white p-3"
        type="button"
        aria-label="로그아웃"
      >
        <LogOut />
        <span>로그아웃</span>
      </button>

      {/* 로그아웃 모달 */}
      {showModal && <LogoutModal onClose={handleCloseModal} />}
    </>
  );
}

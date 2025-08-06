'use client';

import { updateUserInfo } from '@/data/actions/user';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SaveButton({ selected }: { selected: string }) {
  const { user, accessToken } = useAuthStore();

  const router = useRouter();

  const handleSave = async () => {
    if (!user?._id || !accessToken) return;
    const hobby = selected;
    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('hobby', hobby);

    const res = await updateUserInfo(user._id, formData);
    if (res.ok === 1) {
      toast.success('취미가 변경되었습니다');
      router.push('/character');
    } else {
      toast.error('취미 변경에 실패했습니다');
    }
  };

  return (
    <div className="sticky right-0 bottom-0 left-0 bg-transparent py-3">
      <button
        onClick={handleSave}
        className="w-full cursor-pointer rounded-full bg-[#4a4a4a] py-3 text-sm text-white"
      >
        변경하기
      </button>
    </div>
  );
}

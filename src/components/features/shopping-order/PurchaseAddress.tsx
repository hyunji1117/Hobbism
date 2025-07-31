import { useAuthStore } from '@/store/auth.store';
import { MapPin } from 'lucide-react';

export function PurchaseAddress() {
  const accessToken = useAuthStore(state => state.accessToken);
  const user = useAuthStore(state => state.user);

  return (
    <>
      <div className="mx-3.5">
        <div className="mb-2 flex justify-between border-b border-b-[#EAEAEA] pb-2">
          <h2 className="text-lg font-bold">배송 정보</h2>
          <button className="text-right font-semibold text-[#FE508B]">
            변경하기
          </button>
        </div>
        <div className="flex gap-2">
          <MapPin />
          <div className="leading-snug">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-[#4B5563]">{user?.phone}</p>
            <p className="text-[#4B5563]">{user?.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}

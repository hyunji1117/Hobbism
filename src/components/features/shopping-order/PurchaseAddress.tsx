import { MapPin } from 'lucide-react';

export function PurchaseAddress() {
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
            <p className="font-semibold">홍길동</p>
            <p className="text-[#4B5563]">010-1234-1234</p>
            <p className="text-[#4B5563]">서울 어쩌꽁저꺼조저쩌구나라</p>
          </div>
        </div>
      </div>
    </>
  );
}

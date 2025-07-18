import Image from 'next/image';
import { Pencil } from 'lucide-react';

export default function CommunityMainHeader() {
  return (
    <div className="flex w-full items-center justify-between px-5">
      {/* 왼쪽 - 로고 */}
      <div>
        <Image src="/images/inhwan/logo-H.svg" alt="로고" width={24} height={24} />
      </div>

      {/* 가운데 - 커뮤니티 텍스트 */}
      <div>
        <h1 className="text-xl font-bold text-black">커뮤니티</h1>
      </div>

      {/* 오른쪽 - 편집 아이콘 */}
      <div>
        <Pencil size={24} />
      </div>
    </div>
  );
}

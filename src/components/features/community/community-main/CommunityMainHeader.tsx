import Image from 'next/image';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function CommunityMainHeader() {
  return (
    <div className="flex h-[38px] w-full items-center justify-between border-b border-[#F3F4F6] px-5 pt-5 pb-8">
      {/* 왼쪽 - 로고 */}
      <div>
        <Image
          src="/images/inhwan/logo-H.svg"
          alt="로고"
          width={24}
          height={24}
        />
      </div>

      {/* 가운데 - 커뮤니티 텍스트 */}
      <div>
        <h1 className="text-xl font-bold text-black">커뮤니티</h1>
      </div>

      {/* 오른쪽 - 편집 아이콘 */}
      <Link href="/community/write" prefetch>
        <Pencil size={24} />
      </Link>
    </div>
  );
}

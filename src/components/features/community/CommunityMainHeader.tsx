import Image from 'next/image';
import { Edit3 } from 'lucide-react';

export default function CommunityMainHeader() {
  return (
    <div>
      {/* 왼쪽 - 로고 */}
      <div>
        <Image src="/inhwan/logo-H.svg" alt="로고" width={24} height={24} />
      </div>

      {/* 가운데 - 커뮤니티 텍스트 */}
      <div>
        <h1>커뮤니티</h1>
      </div>

      {/* 오른쪽 - 편집 아이콘 */}
      <div>
        <Edit3 />
      </div>
    </div>
  );
}

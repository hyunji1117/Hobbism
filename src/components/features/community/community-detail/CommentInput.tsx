import Image from 'next/image';
import { Send } from 'lucide-react';

interface CommentInputProps {
  profileImage: string;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
}: CommentInputProps) {
  return (
    <div>
      {/* 프로필 이미지 */}
      <div>
        <Image
          src={profileImage}
          alt={'프로필'}
          width={32}
          height={32}
        />
      </div>

      {/* 입력창 */}
      <div>
        <input type="text" placeholder="댓글을 입력하세요" />
        <button>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

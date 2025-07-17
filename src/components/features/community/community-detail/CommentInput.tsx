import Image from 'next/image';
import { CircleArrowUp } from 'lucide-react';

interface CommentInputProps {
  profileImage: string;
}

export default function CommentInput({
  profileImage = '/images/inhwan/profile-default.png',
}: CommentInputProps) {
  return (
    <div className="flex h-[74px] w-full items-center gap-3 bg-white px-5">
      {/* 프로필 이미지 */}
      <div className="h-8 w-8 flex-shrink-0">
        <Image
          src={profileImage}
          alt="프로필"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      {/* 입력창 + 전송 버튼 */}
      <div className="relative flex flex-1 items-center">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="h-10 w-[276px] rounded-full bg-[#F3F4F6] px-4 text-sm placeholder-[#c3c3c3] focus:outline-none"
        />
        <button className="absolute right-2">
          <CircleArrowUp size={24} className="text-black" />
        </button>
      </div>
    </div>
  );
}
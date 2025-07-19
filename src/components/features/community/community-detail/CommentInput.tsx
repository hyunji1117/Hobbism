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
      <div className="relative flex-1 items-center pr-3">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="h-10 w-full rounded-full bg-[#F3F4F6] px-4 text-sm placeholder-[#c3c3c3] focus:outline-none"
        />
      </div>
      <button className="absolute right-2">
        <CircleArrowUp size={24} className="mr-4" />
      </button>
    </div>
  );
}

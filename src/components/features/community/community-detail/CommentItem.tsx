'use client';
import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

interface CommentItemProps {
  profileImage: string;
  userName: string;
  timeAgo: string;
  comment: string;
  postId: number;
  replyId: string;
}

export default function CommentItem({
  userName = '댓글 작성자',
  timeAgo = '1시간 전',
  comment = '정말 날씨가 좋네요!',
  profileImage = '/images/inhwan/profile-default.png',
}: CommentItemProps) {
  return (
    <div className="w-full">
      <div className="flex min-h-[70px] items-start justify-between px-5 py-4">
        <div className="flex flex-1 gap-3">
          <div className="h-8 w-8 flex-shrink-0">
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-normal text-black">{userName}</span>
              <span className="text-sm font-normal text-[#C3C3C3]">
                {timeAgo}
              </span>
            </div>

            <div>
              <p className="text-sm leading-5 font-normal text-[#4B5563]">
                {comment}
              </p>
            </div>
          </div>
        </div>

        <button type="button" className="flex-shrink-0">
          <MoreVertical size={18} className="text-hobbism-black" />
        </button>
      </div>

      <div className="border-b border-[#EAEAEA]"></div>
    </div>
  );
}

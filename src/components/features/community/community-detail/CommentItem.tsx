'use client';

import Image from 'next/image';
import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import CommentOptionsModal from './CommentOptionsModal';

interface CommentItemProps {
  profileImage: string;
  userName: string;
  timeAgo: string;
  comment: string;
  postId: number;
  replyId: string;
  onEditClick: (replyId: string, content: string) => void;
  onAfterDelete: () => void;
}

export default function CommentItem({
  userName = '댓글 작성자',
  timeAgo = '1시간 전',
  comment = '정말 날씨가 좋네요 저도 싸우러 갈게요!',
  profileImage = '/images/inhwan/profile-default.png',
  postId,
  replyId,
  onEditClick,
  onAfterDelete,
}: CommentItemProps) {
  const [isOptionModal, setIsOptionModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCommentOption = () => {
    setIsOptionModal(!isOptionModal);
  };

  const closeModal = () => setIsOptionModal(false);

  const handleEdit = () => {
    onEditClick(replyId, comment);
    setIsOptionModal(false);
  };

  const handleDelete = async () => {
    try {
      await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: postId, reply_id: replyId }),
      });
      onAfterDelete();
    } catch (error) {
      console.log('댓글 삭제 실패', error);
    }
    setIsOptionModal(false);
  };

  return (
    <div className="w-full">
      {/* 댓글 내용 영역 */}
      <div className="flex min-h-[70px] justify-between px-5 py-4">
        {/* 좌측 프로필 + 댓글 내용 */}
        <div className="flex flex-1 gap-3">
          {/* 프로필 이미지 */}
          <div className="h-8 w-8 flex-shrink-0">
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          {/* 댓글 내용 */}
          <div className="flex-1">
            {/* 작성자, 시간 */}
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-normal text-black">{userName}</span>
              <span className="text-sm font-normal text-[#C3C3C3]">
                {timeAgo}
              </span>
            </div>

            {/* 댓글 텍스트 */}
            <div>
              <p className="text-sm leading-5 font-normal text-[#4B5563]">
                {comment}
              </p>
            </div>
          </div>
        </div>

        {/* 우측 설정 아이콘 */}
        <div ref={modalRef} className="relative">
          <button
            className="relative bottom-3 flex-shrink-0"
            onClick={handleCommentOption}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>
        {isOptionModal && (
          <CommentOptionsModal
            onClose={closeModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* 하단 보더 (1px) */}
      <div className="border-b border-[#EAEAEA]"></div>
    </div>
  );
}

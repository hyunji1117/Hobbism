'use client';

import { Separator } from '@/components/ui/separator';
import { Comment, PostReply, User } from '@/types';
import { getUserImageUrl } from '@/utils';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { deleteReply } from '@/data/actions/post';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  comment: PostReply;
  mine: boolean;
  post_id: string;
  onDeleteSuccess?: () => void;
}

export default function CommentListItem({
  comment,
  mine,
  post_id,
  onDeleteSuccess,
}: Props) {
  //          state: 정렬 영역 요소 참조 상태          //
  const showMoreRef = useRef<HTMLDivElement | null>(null);

  //          state: more 버튼 상태          //
  const [showMore, setShowMore] = useState<boolean>(false);

  const accessToken = useAuthStore(state => state.accessToken);

  const [isDeleting, setIsDeleting] = useState(false);

  //          function: 작성일 경과시간 함수          //
  const getElapsedTime = () => {
    const now = dayjs();
    const writeTime = dayjs(comment.updatedAt);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    return `${Math.floor(gap / 86400)}일 전`;
  };

  //         event handler: more 버튼 클릭 이벤트 처리          //
  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  };

  //          event handler: 박스 외부 영역 클릭 이벤트 처리          //
  const handleOutsideClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (showMore && !showMoreRef.current?.contains(target)) setShowMore(false);
  };

  const onDeleteHandler = async () => {
    if (!accessToken || !post_id || isDeleting) return;

    setIsDeleting(true);

    try {
      const formData = new FormData();
      formData.append('post_id', post_id);
      formData.append('replyId', String(comment._id));
      formData.append('accessToken', accessToken);

      const res = await deleteReply(null, formData);

      if (res.ok === 1) {
        onDeleteSuccess?.();
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  //          effect: 정렬 박스 외부 영역 클릭 시 실행할 함수          //
  useEffect(() => {
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full justify-between text-[#4A4A4A]">
        {/* 프로필 영역 */}
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-8 overflow-hidden rounded-full">
            <Image
              src={getUserImageUrl(comment.user.image)}
              alt={comment.user.name}
              fill
              className="object-cover object-center"
            />
          </div>
          <span className="font-medium">{comment.user.name}</span>
          <div className="h-full py-2">
            <Separator orientation="vertical" />
          </div>
          <div className="text-sm text-[#808080]">{getElapsedTime()}</div>
        </div>
        {/* 수정 삭제 버튼 */}
        {mine && (
          <div
            className="relative cursor-pointer rounded-full transition-colors"
            onClick={onMoreButtonClickHandler}
          >
            <Ellipsis className="text-[#4A4A4A]" size={20} />
            {showMore && (
              <div
                ref={showMoreRef}
                className="absolute top-full right-0 z-40 rounded-sm border border-[#dddddd] bg-white px-3 py-2 text-[#4D4D4D] shadow"
              >
                <button
                  disabled={isDeleting}
                  className="w-fit cursor-pointer appearance-none px-8 py-1 leading-none whitespace-nowrap"
                  onClick={onDeleteHandler}
                >
                  {'삭제'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="whitespace-pre-wrap text-[#4A4A4A]">
          {comment.content}
        </div>
      </div>
    </div>
  );
}

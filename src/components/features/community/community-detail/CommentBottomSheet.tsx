'use client';

import { useEffect, useRef, useState } from 'react';
import { X, MoreVertical, CircleArrowUp } from 'lucide-react';
import Image from 'next/image';
import { fetchReplies } from '@/data/functions/CommunityFetch';
import { createReply } from '@/data/actions/post';
import { useActionState } from 'react';
import { useSession } from 'next-auth/react';
import CommentOptionsModal from './CommentOptionsModal';

interface CommentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

interface Comment {
  _id: number;
  content: string;
  createdAt: string;
  user: {
    _id: number;
    name: string;
    image?: string;
  };
}

export default function CommentBottomSheet({
  isOpen,
  onClose,
  postId,
}: CommentBottomSheetProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const { data: session } = useSession();
  const [state, formAction, isSubmitting] = useActionState(createReply, null);

  // 댓글 목록 불러오기
  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetchReplies(postId);
      if (res.ok) {
        setComments(res.item);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 등록 성공 시 새로고침
  useEffect(() => {
    if (state?.ok) {
      loadComments();
    }
  }, [state]);

  // 모달 열릴 때 댓글 로드
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, postId]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 배경 클릭시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 댓글 옵션 메뉴 열기
  const handleCommentOptions = (commentId: number) => {
    setSelectedCommentId(commentId);
    setShowOptionsModal(true);
  };

  // 댓글 수정
  const handleEditComment = () => {
    console.log('댓글 수정:', selectedCommentId);
    setShowOptionsModal(false);
    // TODO: 댓글 수정 로직
  };

  // 댓글 삭제
  const handleDeleteComment = () => {
    console.log('댓글 삭제:', selectedCommentId);
    setShowOptionsModal(false);
    // TODO: 댓글 삭제 로직
  };

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* z-index를 더 높게 설정 (탭바보다 위에) */}
      <div className="fixed inset-0 z-[100] flex items-end justify-center">
        {/* 배경 오버레이 - 50% 투명도로 변경 */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-600"
          onClick={handleBackdropClick}
        />

        {/* 바텀시트 컨테이너 - 모바일 크기로 제한하되 그 안에서 전체 너비 */}
        <div
          ref={modalRef}
          className="relative w-full max-w-[600px] transform rounded-t-[20px] bg-white shadow-xl transition-transform duration-600 ease-out"
          style={{
            height: '50vh', // 화면 절반 높이로 변경
            animation: isOpen
              ? 'slideUp 0.6s ease-out'
              : 'slideDown 0.6s ease-in', // 2배 느리게
          }}
        >
          {/* 상단 헤더 */}
          <div className="relative flex items-center justify-center border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900">댓글</h3>
            <button
              onClick={onClose}
              className="absolute right-4 rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* 댓글 목록 영역 */}
          <div className="flex-1 overflow-y-auto pb-20">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <div className="text-gray-500">댓글을 불러오는 중...</div>
              </div>
            ) : comments.length > 0 ? (
              <div className="px-4 py-2">
                {comments.map(comment => (
                  <div
                    key={comment._id}
                    className="flex items-start gap-3 py-3"
                  >
                    {/* 프로필 이미지 */}
                    <div className="h-8 w-8 flex-shrink-0">
                      <Image
                        src={
                          comment.user.image ||
                          '/images/inhwan/profile-default.png'
                        }
                        alt={`${comment.user.name} 프로필`}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>

                    {/* 댓글 내용 */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-black">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-800">
                        {comment.content}
                      </p>
                    </div>

                    {/* 세로점3개 메뉴 */}
                    <button
                      onClick={() => handleCommentOptions(comment._id)}
                      className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
                    >
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center">
                <div className="text-gray-500">아직 댓글이 없습니다.</div>
              </div>
            )}
          </div>

          {/* 하단 고정 댓글 입력창 */}
          <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-white">
            <form action={formAction} className="p-4">
              <input type="hidden" name="_id" value={postId} />
              <input
                type="hidden"
                name="accessToken"
                value={session?.accessToken || 'test-token'}
              />

              <div className="flex items-center gap-3">
                {/* 프로필 이미지 */}
                <div className="h-8 w-8 flex-shrink-0">
                  <Image
                    src="/images/inhwan/profile-default.png"
                    alt="내 프로필"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* 입력창 */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="content"
                    placeholder="댓글을 입력하세요"
                    className="h-10 w-full rounded-full border-none bg-gray-100 px-4 text-sm placeholder-gray-500 transition-colors outline-none focus:bg-gray-200"
                    disabled={isSubmitting}
                  />
                </div>

                {/* 전송 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                  <CircleArrowUp size={24} className="text-black" />
                </button>
              </div>

              {/* 에러 메시지 */}
              {state?.ok === 0 && (
                <p className="mt-2 text-sm text-red-500">
                  {state.errors?.content?.msg || state.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 애니메이션 CSS - 속도를 2배 느리게 변경 */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }

          @keyframes slideDown {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(100%);
            }
          }
        `}</style>
      </div>

      {/* 댓글 옵션 모달 */}
      {showOptionsModal && (
        <CommentOptionsModal
          type="comment"
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          onClose={() => setShowOptionsModal(false)}
        />
      )}
    </>
  );
}

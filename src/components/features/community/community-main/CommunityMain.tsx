'use client';

import Image from 'next/image';
import {
  MessageCircle,
  SquareArrowOutUpRight,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { getUserImageUrl } from '@/utils';
import CommentBottomSheet from '../community-detail/CommentBottomSheet';
import CommentOptionsModal from '../community-detail/CommentOptionsModal';

// 카카오 SDK 타입 정의
interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: {
      objectType: string;
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttons: Array<{
        title: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      }>;
    }) => void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CommunityMainProps {
  post: Post;
}

export default function CommunityMain({ post }: CommunityMainProps) {
  const [isCheckBookmark, setIsCheckBookmark] = useState(false);
  const [isExpandedText, setIsExpandedText] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '');
    }
  }, []);

  const handleComment = () => {
    setIsOpenComment(true);
  };

  const handleCommentClose = () => {
    setIsOpenComment(false);
  };

  // 게시글 옵션 메뉴
  const handlePostOptions = () => {
    setShowPostOptions(true);
  };

  // 게시글 수정
  const handleEditPost = () => {
    console.log('게시글 수정:', post._id);
    setShowPostOptions(false);
    // TODO: 게시글 수정 로직
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    console.log('게시글 삭제:', post._id);
    setShowPostOptions(false);
    // TODO: 게시글 삭제 로직
  };

  const handleShareToKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${post.user.name}의 게시물`,
        description: post.content,
        imageUrl: post.image?.[0]
          ? `https://fesp-api.koyeb.app/market/${post.image[0]}`
          : `${window.location.origin}/images/inhwan/barrier.webp`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleShare = () => {
    handleShareToKakao();
  };

  const handleCheckBookmark = () => {
    setIsCheckBookmark(!isCheckBookmark);
    // TODO: 북마크 API 연동
  };

  const handleTextToggle = () => {
    setIsExpandedText(!isExpandedText);
  };

  // 텍스트가 긴지 확인 ("더보기" 버튼까지 포함해서 한 줄)
  const isLongText = post.content.length > 40; // 더보기 버튼까지 한 줄에 들어가도록
  const displayText =
    isExpandedText || !isLongText
      ? post.content
      : `${post.content.slice(0, 40)}...`;

  return (
    <>
      <div className="w-full">
        {/* 상단 프로필 영역 - 우측에 점3개 아이콘 추가 */}
        <div className="flex h-[60px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            {/* 프로필 이미지 */}
            <div className="h-8 w-8">
              <Image
                src={getUserImageUrl(post.user.image)}
                alt={`${post.user.name} 프로필`}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>

            {/* 닉네임, 시간 */}
            <div className="flex flex-col">
              <div className="text-sm font-bold text-black">
                {post.user.name}
              </div>
              <div className="text-xs font-normal text-[#4B5563]">
                {post.createdAt}
              </div>
            </div>
          </div>

          {/* 우측 게시글 옵션 아이콘 */}
          <button
            onClick={handlePostOptions}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <MoreHorizontal size={20} className="text-gray-400" />
          </button>
        </div>

        {/* 중간 - 피드 이미지 */}
        <div className="relative aspect-square w-full">
          <Image
            src={
              post.image?.[0] // 배열의 첫 번째 이미지
                ? `https://fesp-api.koyeb.app/market/${post.image[0]}`
                : '/images/inhwan/barrier.webp'
            }
            alt="피드 이미지"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* 아이콘 영역 (48px) */}
        <div className="flex h-12 items-center justify-between px-5">
          {/* 좌측 댓글,공유 아이콘 */}
          <div className="flex items-center gap-[14px]">
            <button className="cursor-pointer" onClick={handleComment}>
              <MessageCircle size={24} className="text-black" />
            </button>
            <button className="cursor-pointer" onClick={handleShare}>
              <SquareArrowOutUpRight size={24} className="text-black" />
            </button>
          </div>

          {/* 우측 북마크 아이콘 */}
          <button className="cursor-pointer" onClick={handleCheckBookmark}>
            {isCheckBookmark ? (
              <Bookmark size={24} className="fill-black text-black" />
            ) : (
              <Bookmark size={24} className="text-black" />
            )}
          </button>
        </div>

        {/* 하단 - 텍스트 영역 (한 줄 기준으로 수정) */}
        <div className="min-h-12 px-5 py-3">
          <p className="text-sm leading-5 font-normal text-black">
            {displayText}
            {isLongText && (
              <button
                onClick={handleTextToggle}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {isExpandedText ? '접기' : '더보기'}
              </button>
            )}
          </p>
        </div>

        {/* 하단 보더라인 */}
        <div className="border-b border-[#EAEAEA]"></div>
      </div>

      {/* 댓글 모달 */}
      {isOpenComment && (
        <CommentBottomSheet
          isOpen={isOpenComment}
          onClose={handleCommentClose}
          postId={post._id}
        />
      )}

      {/* 게시글 옵션 모달 */}
      {showPostOptions && (
        <CommentOptionsModal
          type="post"
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          onClose={() => setShowPostOptions(false)}
        />
      )}
    </>
  );
}

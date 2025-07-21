'use client';

import Image from 'next/image';
import { MessageCircle, SquareArrowOutUpRight, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentSection from '../community-detail/CommentSection';

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

interface BookmarkFeedCardProps {
  profileImage: string;
  userName: string;
  timeAgo: string;
  image: string;
  description: string;
  postId: number;
}

export default function BookmarkFeedCard({
  postId,
  userName = '오다구',
  timeAgo = '2시간 전',
  description = '드디어 완성된 결계 마왕의 졸개를 처리하느라 힘들었지만 만족스럽다고 말하고 싶다',
  image = '/images/inhwan/barrier.webp',
  profileImage = '/images/inhwan/profile-default.png',
}: BookmarkFeedCardProps) {
  const [isCheckBookmark, setIsCheckBookmark] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);

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
    setIsOpenComment(!isOpenComment);
  };

  const handleShareToKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${userName}의 게시물`,
        description,
        imageUrl: `${window.location.origin}${image}`,
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
  };

  return (
    <div className="w-full">
      {/* 상단 프로필 영역 (60px) */}
      <div className="flex h-[60px] items-center px-5">
        <div className="flex items-center gap-2">
          {/* 프로필 이미지 */}
          <div className="h-8 w-8">
            <Image
              src={profileImage}
              alt={`${userName} 프로필`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>

          {/* 닉네임, 시간 */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-black">{userName}</div>
            <div className="text-xs font-normal text-[#4B5563]">{timeAgo}</div>
          </div>
        </div>
      </div>

      {/* 중간 - 피드 이미지 (반응형) */}
      <div className="relative aspect-square w-full">
        <Image
          src={image}
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

      {/* 하단 - 텍스트 영역 (가변형이고 기본높이 48px) */}
      <div className="min-h-12 px-5 py-3">
        <p className="text-sm leading-5 font-normal text-black">
          {description}
        </p>
      </div>

      {/* 하단 보더라인 */}
      <div className="border-b border-[#EAEAEA]"></div>

      {/* 댓글 영역 */}
      {isOpenComment && (
        <div className="border-b border-[#EAEAEA] px-5 py-4">
          <CommentSection postId={postId} />
        </div>
      )}
    </div>
  );
}

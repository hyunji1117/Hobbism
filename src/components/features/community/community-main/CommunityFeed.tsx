'use client';

import { useEffect, useRef, useState } from 'react';
import { Post } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import { getUserImageUrl } from '@/utils';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  MessageCircle,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { deletePost } from '@/data/actions/post';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';
import DeleteModal from '@/components/common/DeleteModal';
import { deleteBookmark, postBookmark } from '@/data/actions/bookmark';
import { FEED_CATEGORIES } from '@/constant/category';
import { useFollowStore } from '@/store/follow.store';

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

interface Props {
  post: Post;
  page: 'main' | 'detail';
  isBookmarked: boolean;
  bookmark_id?: number;
  onDelete?: (_id: number) => void;
}

//          component: 커뮤니티 피드 컴포넌트          //
export default function CommunityFeed({
  post,
  page,
  isBookmarked,
  bookmark_id,
  onDelete,
}: Props) {
  const { user, accessToken } = useAuthStore();
  const isOwner = user?._id === post.user._id;
  const imageList = Array.isArray(post.image) ? post.image : [post.image];

  const { followMap, setFollow, removeFollow } = useFollowStore();
  const isFollowed = !!followMap[post.user._id];
  const follow_id = followMap[post.user._id];

  //          state: 정렬 영역 요소 참조 상태          //
  const showMoreRef = useRef<HTMLDivElement | null>(null);

  //          state: more 버튼 상태          //
  const [showMore, setShowMore] = useState<boolean>(false);

  const [isBookmark, setBookmark] = useState<boolean>(isBookmarked);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  //          state: 북마크 ID 상태          //
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);

  //          state: 라벨 파싱          //
  const tagLabel =
    FEED_CATEGORIES.find(category => category.value === post.tag)?.label ??
    post.tag;

  //          state: 팔로우 로딩 상태          //
  const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
  //          state: 북마크 로딩 상태          //
  const [loadingBookmark, setLoadingBookmark] = useState<boolean>(false);
  //          function: 라우터 함수          //
  const router = useRouter(); // 라우터 이동용
  //          function: 오픈 모달 함수          //
  const openModal = useModalStore(state => state.openModal); // 성공 모달 열기용
  const clearModals = useModalStore(state => state.clearModals);
  //         event handler: more 버튼 클릭 이벤트 처리          //
  const onMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  };

  //          event handler: 박스 외부 영역 클릭 이벤트 처리          //
  const handleOutsideClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (showMore && !showMoreRef.current?.contains(target)) setShowMore(false);
  };

  //          event handler: 삭제 확인 모달 버튼 클릭 이벤트 처리          //
  const onDeleteModalOpenHandler = () => {
    openModal(({ onClose }) => (
      <DeleteModal
        key="delete-modal"
        onClose={onClose}
        onConfirm={onDeleteButtonClickHandler}
      />
    ));
  };
  //         event handler: 삭제 버튼 클릭 이벤트 처리          //
  const onDeleteButtonClickHandler = async () => {
    if (!accessToken) return;

    const formData = new FormData();
    formData.append('_id', post._id.toString());
    formData.append('accessToken', accessToken);

    const res = await deletePost(null, formData);

    if (res.ok === 1) {
      clearModals();
      setShowMore(false);
      if (page === 'main') {
        onDelete?.(post._id);
      } else {
        await router.refresh();
        router.push('/community');
      }
      router.push('/community');
    } else {
      console.error('게시물 삭제 안됨');
    }
  };

  //          event handler: 북마크 버튼 클릭 이벤트 처리          //
  const onBookmarkButtonClickHandler = async () => {
    if (loadingBookmark) return;
    try {
      if (!accessToken) return;

      if (isBookmark && bookmark_id) {
        // 팔로우 취소 → 북마크 삭제
        setLoadingBookmark(true);
        const res = await deleteBookmark(bookmark_id, accessToken);

        if (res.ok === 1) {
          console.log('삭제됨');
          setBookmark(false);
        }
      } else {
        // 팔로우 → 북마크 추가
        const res = await postBookmark('post', post._id, accessToken);
        if (res.ok === 1) {
          console.log('추가됨');
          setBookmark(true);
        }
      }
    } catch (err) {
      console.error('팔로우 상태 변경 실패:', err);
    } finally {
      setLoadingBookmark(false);
    }
  };

  //          event handler: 팔로우 토큰 버튼 클릭 이벤트 처리          //
  const handleToggleFollow = async () => {
    if (loadingFollow) return;
    try {
      if (!accessToken) return;
      setLoadingFollow(true);

      const userId = post.user._id.toString();

      if (isFollowed && follow_id) {
        const res = await deleteBookmark(follow_id, accessToken);

        if (res.ok === 1) {
          console.log('삭제됨');
          removeFollow(post.user._id.toString());
        }
      } else {
        const res = await postBookmark('user', post.user._id, accessToken);
        if (res.ok === 1 && res.item?._id) {
          console.log('추가됨');
          setFollow(userId, res.item._id);
        }
      }
    } catch (err) {
      console.error('팔로우 상태 변경 실패:', err);
    } finally {
      setLoadingFollow(false);
    }
  };
  //          event handler: 공유하기 버튼 클릭 이벤트 처리          //
  const handleShareToKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${post.user.name}님의 게시물`,
        description: post.content,
        imageUrl: `${post.image?.[0]}`,
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

  //          effect: 컴포넌트가 마운트 될 떄 실행할 함수          //
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '');
    }
  }, []);

  //          effect: 정렬 박스 외부 영역 클릭 시 실행할 함수          //
  useEffect(() => {
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore]);

  return (
    <div className="w-full overflow-hidden text-[#4A4A4A]">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
        <Link
          href={`/user/${post.user._id}`}
          className="relative aspect-square w-[38px] overflow-hidden rounded-full"
          prefetch={true}
        >
          <Image
            src={getUserImageUrl(post.user.image)}
            alt={post.user.name}
            fill
            sizes="600"
            priority
          />
        </Link>
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-sm font-bold">{post.user.name}</span>
          <span className="text-xs font-normal text-[#999999]">
            {post.updatedAt.slice(0, 10)}
          </span>
        </div>

        <div className="relative flex items-center gap-3">
          {!isOwner && (
            <button
              className={cn(
                'cursor-pointer rounded-full border border-[#4A4A4A] px-5 py-1 text-sm font-semibold',
                isFollowed ? 'bg-[#4A4A4A] text-white' : 'bg-white',
              )}
              onClick={handleToggleFollow}
            >
              {isFollowed ? '팔로잉' : '팔로우'}
            </button>
          )}
          <button
            className="relative cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
            onClick={onMoreButtonClickHandler}
          >
            <EllipsisVertical size={22} className="text-gray-400" />
          </button>
          {showMore && isOwner && (
            <div
              ref={showMoreRef}
              className="absolute top-full right-0 z-40 rounded-sm border border-[#dddddd] bg-white px-3 py-2 text-[#4D4D4D] shadow"
            >
              <Link
                href={`/community/update/${post._id}`}
                className="w-fit appearance-none px-8 py-1 leading-none whitespace-nowrap"
                prefetch={true}
              >
                <span className="text-[#98B87E]">수정</span>
              </Link>
              <div className="my-1">
                <Separator />
              </div>
              <button
                className="w-fit cursor-pointer appearance-none px-8 py-1 leading-none whitespace-nowrap"
                onClick={onDeleteModalOpenHandler}
              >
                {'삭제'}
              </button>
            </div>
          )}
          {showMore && !isOwner && (
            <div
              ref={showMoreRef}
              className="absolute top-full right-0 z-40 rounded-sm border border-[#dddddd] bg-white px-3 py-2 text-[#4D4D4D] shadow"
            >
              <button className="w-fit cursor-pointer appearance-none px-4 py-1 leading-none whitespace-nowrap">
                {'신고하기'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 슬라이드 영역 */}
      <div className="relative flex w-full items-center justify-center">
        <Swiper
          spaceBetween={10}
          slidesPerView={1} // 한 화면에 1.2장 보이게
          modules={[Navigation, Pagination]}
          onSwiper={swiper => {
            setSwiper(swiper);
            setCurrentIndex(swiper.activeIndex);
          }}
          onSlideChange={swiper => {
            setCurrentIndex(swiper.activeIndex);
          }}
          pagination={{ type: 'custom' }}
          className="w-full"
        >
          {imageList.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative aspect-square w-full">
                <Image
                  src={img}
                  alt={`피드 이미지 ${idx + 1}`}
                  fill
                  sizes="600"
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white/70 px-2 text-sm text-[#999999]">
                  {idx + 1}/{post.image.length}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 아이콘 영역 */}
      <div className="flex h-12 items-center justify-between px-5 text-[#4A4A4A]">
        {/* 좌측 댓글,공유 아이콘 */}
        <div className="flex items-center gap-3.5">
          <Link
            href={`/community/${post._id}`}
            className="flex cursor-pointer items-center"
            prefetch={true}
          >
            <MessageCircle size={24} className="mr-1.5" />
            <span className="font-semibold">{post.repliesCount}</span>
          </Link>
          <button className="cursor-pointer">
            <SquareArrowOutUpRight
              size={24}
              className=""
              onClick={handleShareToKakao}
            />
          </button>
        </div>

        {/* 우측 북마크 아이콘 */}
        <button
          className="cursor-pointer"
          onClick={onBookmarkButtonClickHandler}
        >
          <Bookmark
            size={24}
            className={'text-[#4A4A4A]'}
            fill={isBookmark ? '#4A4A4A' : 'none'}
          />
        </button>
      </div>

      {/* 본문 영역 */}
      <Link
        href={`/community/${post._id}`}
        className="flex px-4 pb-2"
        prefetch={true}
      >
        <p
          className={cn(
            'whitespace-pre-wrap text-[#4A4A4A]',
            page === 'main' ? 'line-clamp-3' : '',
          )}
        >
          {post.content}
        </p>
      </Link>

      <div className="flex px-4 text-xs">
        <button className="cursor-pointer rounded-sm bg-[#eaedef] px-2 py-1 font-semibold text-[#4a4a4a]">
          {`# ${tagLabel}`}
        </button>
      </div>

      <div className="px-4 pt-3">
        <Separator />
      </div>
    </div>
  );
}

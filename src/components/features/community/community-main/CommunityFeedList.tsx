'use client';

import CommunityFeed from './CommunityFeed';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Post, Bookmark, BookmarkPost } from '@/types';
import { useFollowStore } from '@/store/follow.store';
import { fetchPosts } from '@/data/functions/CommunityFetch';
import CommunityFeedSkeleton from '@/components/features/community/community-main/CommunityFeedSkeleton';

interface Props {
  posts: Post[];
  postBookmarks: BookmarkPost[];
  userFollows: Bookmark[];
  totalPages: number;
}

export default function CommunityFeedList({
  posts: initialPosts,
  postBookmarks,
  userFollows,
  totalPages,
}: Props) {
  const setBulkFollows = useFollowStore(state => state.setBulkFollows);

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = userFollows.reduce(
      (acc, follow) => {
        acc[follow.user._id.toString()] = follow._id;
        return acc;
      },
      {} as Record<string, number>,
    );
    setBulkFollows(map);
  }, [userFollows, setBulkFollows]);

  const loadMore = useCallback(async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);
    const nextPage = page + 1;

    const res = await fetchPosts('community', nextPage, 10);
    if (res.ok === 1 && res.item.length > 0) {
      setPosts(prev => [...prev, ...res.item]);
      setPage(nextPage);
    }

    setLoading(false);
  }, [page, totalPages, loading]);

  const handleDelete = (_id: number) => {
    setPosts(prev => prev.filter(post => post._id !== _id));
  };

  // IntersectionObserver 등록
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore]);

  return (
    <>
      {posts.map(post => {
        const bookmark = postBookmarks.find(b => b.post._id === post._id);

        const isBookmarked = !!bookmark;
        const bookmark_id = bookmark?._id;

        return (
          <CommunityFeed
            key={post._id}
            post={post}
            page="main"
            isBookmarked={isBookmarked}
            bookmark_id={bookmark_id}
            onDelete={handleDelete}
          />
        );
      })}

      {/* 로딩 메시지 */}
      {loading && (
        <>
          {[...Array(1)].map((_, i) => (
            <CommunityFeedSkeleton key={`skeleton-${i}`} />
          ))}
        </>
      )}
      {/* 관찰 대상 (스크롤 바닥 감지용) */}
      <div ref={observerRef} className="h-10" />
    </>
  );
}

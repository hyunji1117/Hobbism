'use client';

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function CommunityFeedSkeleton() {
  return (
    <div className="w-full overflow-hidden text-[#4A4A4A]">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-3">
        <Skeleton className="h-[38px] w-[38px] rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-[30px] w-[80px] rounded-full" />
          <Skeleton className="h-[30px] w-[30px] rounded-full" />
        </div>
      </div>

      {/* 이미지 슬라이더 영역 */}
      <div className="relative aspect-square w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* 아이콘 영역 */}
      <div className="flex h-12 items-center justify-between px-5 pt-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* 본문 영역 */}
      <div className="px-4 pb-2">
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>

      {/* 태그 영역 */}
      <div className="px-4">
        <Skeleton className="h-6 w-16 rounded-sm" />
      </div>

      <div className="px-4 pt-3">
        <Separator />
      </div>
    </div>
  );
}

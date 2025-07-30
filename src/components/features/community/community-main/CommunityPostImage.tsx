import Image from 'next/image';
import { Post } from '@/types';

interface CommunityPostImageProps {
  post: Post;
}

export default function CommunityPostImage({ post }: CommunityPostImageProps) {
  return (
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
  );
}

import { Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  images: string | string[];
  alt?: string;
  href: string;
  onClick?: () => void;
}

export function FeedCard({
  images,
  alt = '피드 이미지',
  onClick,
  href,
}: Props) {
  const isMultiple = Array.isArray(images) && images.length > 1;
  const firstImage = Array.isArray(images) ? images[0] : images;

  return (
    <Link
      href={href}
      className="relative aspect-square w-full cursor-pointer overflow-hidden rounded"
      onClick={onClick}
    >
      {images && (
        <Image
          src={`https://fesp-api.koyeb.app/market/${firstImage}`}
          alt={alt}
          fill
          sizes="184px"
          className="object-cover"
          priority
        />
      )}
      {isMultiple && (
        <div className="absolute top-1 right-1 z-10 rounded p-1 text-white">
          <Copy size={16} fill="white" />
        </div>
      )}
    </Link>
  );
}

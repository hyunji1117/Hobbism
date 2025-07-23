'use client';

import { hobbyData } from '@/components/features/shop/RandomHobby/RandomHobbyContent';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const RandomHobbyBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    const index = Math.floor(Math.random() * hobbyData.length);
    const hobby = hobbyData[index];
    router.push(
      `/shop/randomHobby?hobby=${encodeURIComponent(hobby.category)}`,
    );
  };
  return (
    <>
      <div onClick={handleClick}>
        <div className="relative my-6 aspect-[4/1] w-full">
          <Image
            fill
            src="/images/ayoung/ad/ad00.webp"
            alt="오늘의 취미 뽑기"
            sizes="100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>
    </>
  );
};

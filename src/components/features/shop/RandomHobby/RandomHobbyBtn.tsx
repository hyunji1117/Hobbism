'use client';

import { hobbyData } from '@/components/features/shop/RandomHobby/RandomHobbyContent';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//         component: 오늘의 취미 뽑기 배너 버튼        //
export const RandomHobbyBtn = () => {
  const router = useRouter();

  //       function: 배너 클릭 시 랜덤으로 뽑기(params로 넘김)        //
  const handleClick = () => {
    const index = Math.floor(Math.random() * hobbyData.length);
    const hobby = hobbyData[index];
    router.push(
      `/shop/randomHobby?hobby=${encodeURIComponent(hobby.category)}`,
    );
  };

  //         render: 오늘의 취미 뽑기 버튼 컴포넌트 렌더       //
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

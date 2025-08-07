'use client';

import { RecommendProducts } from '@/components/features/shop/RecommendProducts';
import { Product } from '@/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

//          component: 오늘의 취미 뽑기 데이터         //
export const hobbyData = [
  {
    category: 'PERFUME',
    categoryKr: '향수',
    src: '/images/ayoung/hobby/hobby-05.webp',
    comment1: '오늘의 기분에 맞춰 향기를 바꾸자! 🌸',
    comment2: '상큼, 포근, 우디... 무슨 향이 좋을까?',
    comment3: '오늘의 시그니처 향 찾기 도전!',
    comment4: '지금 향기 찾으러 가 볼까?',
  },
  {
    category: 'RUNNING',
    categoryKr: '러닝',
    src: '/images/ayoung/hobby/hobby-04.webp',
    comment1: '신발 끈 묶고 바람 맞으러 가자! 🍀',
    comment2: '5분 뛰기부터도 충분히 시작이야.',
    comment3: '가볍게 동네 한 바퀴도 좋아!',
    comment4: '오늘은 어디까지 가 볼까? GO!',
  },
  {
    category: 'HOMECAFE',
    categoryKr: '홈카페',
    src: '/images/ayoung/hobby/hobby-03.webp',
    comment1: '오늘은 내가 집바리스타! ☕ ',
    comment2: '얼음 가득 콜드브루? 달콤 폼라떼? 맘대로 믹스!',
    comment3: '내 취향 레시피로 한 잔 내려볼까?',
    comment4: '커피향과 함께하는 오늘 하루!',
  },
  {
    category: 'INTERIOR',
    categoryKr: '인테리어',
    src: '/images/ayoung/hobby/hobby-02.webp',
    comment1: '인테리어로 공간에 나만의 감각을 더하기 ✨',
    comment2: '공간에 너만의 감각을 콕!',
    comment3: '조명 하나, 포스터 하나만 바꿔도 분위기 반짝반짝.',
    comment4: '지금 내 공간 꾸미기 시작해 볼까?',
  },
  {
    category: 'DOLL',
    categoryKr: '인형',
    src: '/images/ayoung/hobby/hobby-07.webp',
    comment1: '헉, 진짜 사람 아냐? 손끝에서 완성된 내 취향 100% 💖',
    comment2: '의상 갈아입히고, 포즈 잡고 사진 찰칵! ',
    comment3: '내 방 안의 작은 공주님!',
    comment4: '마음에 쏙 드는 오늘의 인형은 누구일까?',
  },
  {
    category: 'FASHION',
    categoryKr: '코디',
    src: '/images/ayoung/hobby/hobby-06.webp',
    comment1: '레이스, 리본, 러블리 과즙미 FULL 장착! 🎀',
    comment2: '가방 하나로도 공주 무드 완성 가능.',
    comment3: '상하의 코디가 어렵다면, 드레스는 어때?',
    comment4: '오늘의 룩북 만들어 볼까?',
  },
  {
    category: 'GOODS',
    categoryKr: '굿즈',
    src: '/images/ayoung/hobby/hobby-01.webp',
    comment1: '덕심 충전 시간 도착! 😎',
    comment2: '닌텐도 칩, 피규어, 아크릴, 뱃지... 뭐 모을까?',
    comment3: '굿즈 수집은 참을 수 없지!',
    comment4: '내 취향 굿즈 장바구니 채워 보자!',
  },
];

//        component: 오늘의 취미 뽑기 콘텐츠 컴포넌트       //
export const RandomHobbyContent = ({
  categoryData,
}: {
  categoryData?: Product[];
}) => {
  const searchParams = useSearchParams();
  const hobby = searchParams.get('hobby');

  const randomHobby = hobbyData.find(item => item.category === hobby);

  if (!hobby || !categoryData) return <div>취미 정보가 없습니다</div>;

  //         render: 오늘의 취미 뽑기 렌더        //
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center rounded-2xl p-4">
        <h2 className="border-b border-gray-200 pb-4 text-xl font-bold">
          🎉 오늘의 취미는... {randomHobby?.categoryKr}! 🎉
        </h2>

        {/* 이미지 자리 */}
        <div className="relative my-8 aspect-[1.5/1] w-[80%]">
          <Image
            fill
            src={`${randomHobby?.src}`}
            alt={`${randomHobby?.categoryKr}}`}
            sizes="100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-xl shadow-md"
          />
        </div>

        <p className="text-center leading-loose">
          {randomHobby?.comment1} <br />
          {randomHobby?.comment2} <br />
          {randomHobby?.comment3} <br />
          {randomHobby?.comment4}
        </p>

        <p className="mt-5">오늘 뽑힌 취미로 하루를 반짝 업그레이드하자! ✨</p>
      </div>

      <hr className="mt-5" />

      <section className="pl-3.5">
        <h3 className="my-5 text-xl font-bold">
          {randomHobby?.categoryKr} 추천 상품
        </h3>
        <div className="pb-8">
          <RecommendProducts category={hobby} categoryData={categoryData} />
        </div>
      </section>
    </>
  );
};

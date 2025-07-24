'use client';

import ChracterCard from '@/components/features/character/ChracterCard';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { useAuthStore } from '@/store/auth.store';
import CircleProgress from '@/utils/CircleProgress';
import GetLevelInfo from '@/utils/GetLevelInfo';
import { CircleAlert, Smile } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const characterImages = [
  { name: 'cloud', src: '/cloud.png', nickName: '가짜팬', locked: false },
  { name: 'flower', src: '/flower.png', nickName: '조금팬', locked: false },
  { name: 'clover', src: '/clover.png', nickName: '관심팬', locked: false },
  { name: 'rabbit', src: '/rabbit.png', nickName: '찐팬', locked: false },
  { name: 'cloud1', src: '/cloud1.png', nickName: '왕팬', locked: true },
  { name: 'cloud2', src: '/cloud2.png', nickName: '매니아', locked: true },
  { name: 'cloud3', src: '/cloud3.png', nickName: '레전드', locked: true },
  { name: 'cloud4', src: '/cloud4.png', nickName: '오덕', locked: true },
  { name: 'cloud5', src: '/cloud5.png', nickName: 'VIP/십덕', locked: true },
  { name: 'cloud6', src: '/cloud6.png', nickName: '미정', locked: true },
  { name: 'cloud7', src: '/cloud7.png', nickName: '미정', locked: true },
  { name: 'cloud8', src: '/cloud8.png', nickName: '미정', locked: true },
  { name: 'cloud9', src: '/cloud9.png', nickName: '미정', locked: true },
];

export default function ChracterPage() {
  const { user } = useAuthStore(); // 임시로 사용자 이름 사용 (닉네임으로 교체 예정)
  const [isCharacterInfoModal, setIsCharacterInfoModal] = useState(false);

  const points = user?.points ?? 0;
  const levelInfo = GetLevelInfo(points);

  // 가장 최근에 열린 캐릭터 찾기
  const lastOpened = [...characterImages].reverse().find(item => !item.locked);
  // 캐릭터 이미지 상태에 따라 변경
  const [selectedCharacter, setSelectedCharacter] = useState(lastOpened);

  const handleCharacterInfoModal = () => {
    setIsCharacterInfoModal(!isCharacterInfoModal);
  };

  return (
    <>
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b border-[#F3F4F6] bg-white px-5 pb-8">
        <div className="relative top-4 flex h-[38px] w-full items-center justify-between">
          {/* 왼쪽 - 로고 */}
          <div>
            <Image
              src="/images/inhwan/logo-H.svg"
              alt="로고"
              width={24}
              height={24}
            />
          </div>

          {/* 가운데 - 캐릭터 텍스트 */}
          <div>
            <h1 className="text-xl font-bold text-black">나의 캐릭터</h1>
          </div>

          {/* 오른쪽 - 정보 아이콘 */}
          <button onClick={handleCharacterInfoModal}>
            <CircleAlert />
          </button>
        </div>
        {/* 레벨업 정보 모달 */}
        {isCharacterInfoModal && (
          <div className="fixed inset-0 z-11 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[80vh] w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">레벨업 기준 안내</h2>

              <div className="mb-6 space-y-3 text-sm text-gray-700">
                <div>
                  <h3 className="mb-1 font-semibold">
                    &gt; 활동 항목 기준 포인트
                  </h3>
                  <ul className="list-inside list-disc space-y-1">
                    <li>상품 구매 1,000원당 1P</li>
                    <li>커뮤니티 글 작성 1건당 5P</li>
                    <li>커뮤니티 댓글 작성 1건당 2P</li>
                    <li>북마크 추가 1회당 1P</li>
                    <li>라이브 시청 5P</li>
                    <li>라이브 시청 30분마다 20P</li>
                    <li>라이브 내 상품 결제 100P</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mt-4 mb-1 font-semibold">
                    &gt; 레벨 기준 (누적 포인트)
                  </h3>
                  <ul className="list-inside list-disc space-y-1">
                    <li>LV1: 0 ~ 49P - 가짜팬</li>
                    <li>LV2: 50 ~ 149P - 조금팬</li>
                    <li>LV3: 150 ~ 299P - 관심팬</li>
                    <li>LV4: 300 ~ 599P - 찐팬</li>
                    <li>LV5: 600 ~ 999P - 왕팬</li>
                    <li>LV6: 1000 ~ 1499P - 매니아</li>
                    <li>LV7: 1500 ~ 2199P - 레전드</li>
                    <li>LV8: 2200 ~ 2999P - 오덕</li>
                    <li>LV9: 3000p 이상 - VIP / 십덕</li>
                  </ul>
                </div>
              </div>

              <button
                className="mt-4 w-full rounded-md bg-[#FE508B] py-2 text-white hover:bg-[#E6477B]"
                onClick={handleCharacterInfoModal}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 본인 캐릭터 및 설명 */}
      <div className="relative mt-8 flex flex-col items-center">
        {/* 포인트 표시 진행률 */}
        <div className="mr-2 aspect-square h-[118px] w-[118px] items-center">
          <CircleProgress percent={levelInfo.percent} />
        </div>
        <div className="relative bottom-[108px] left-[7px]">
          {selectedCharacter ? (
            <Image
              className="aspect-square rounded-full bg-[#EAEAEA]"
              src={selectedCharacter.src}
              alt={selectedCharacter.name}
              width={119}
              height={119}
            />
          ) : (
            <Smile size={90} className="mt-4" />
          )}
        </div>
        <div className="absolute top-40 text-center">
          {lastOpened && (
            <>
              <span className="text-lg font-semibold">
                {lastOpened.nickName} {user?.name}
              </span>
              <p className="relative top-2 text-center text-sm text-[#4B5563]">
                {lastOpened.nickName} 레벨에 도달하셨네요! <br /> 다음 레벨 가고
                싶어서 못 참겠지?
              </p>
            </>
          )}
        </div>
      </div>

      {/* 캐릭터 종류 */}
      <div className="relative top-6 flex justify-center">
        <div className="grid grid-cols-3 gap-x-1 gap-y-1.5 px-6">
          {characterImages.map(item => (
            <button
              key={item.name}
              type="button"
              disabled={item.locked}
              onClick={() => setSelectedCharacter(item)}
            >
              <ChracterCard
                src={item.src}
                name={item.name}
                nickName={item.nickName}
                locked={item.locked}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 하단 탭바 */}
      {!isCharacterInfoModal && <TabBar />}
    </>
  );
}

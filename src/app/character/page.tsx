'use client';

import ChracterCard from '@/components/features/character/ChracterCard';
import { useAuthStore } from '@/store/auth.store';
import CircleProgress from '@/utils/CircleProgress';
import GetLevelInfo from '@/utils/GetLevelInfo';
import { Smile } from 'lucide-react';
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
  // const [isCharacterInfoModal, setIsCharacterInfoModal] = useState(false);

  const points = user?.points ?? 0;
  const levelInfo = GetLevelInfo(points);

  // 가장 최근에 열린 캐릭터 찾기
  const lastOpened = [...characterImages].reverse().find(item => !item.locked);
  // 캐릭터 이미지 상태에 따라 변경
  const [selectedCharacter, setSelectedCharacter] = useState(lastOpened);

  // const handleCharacterInfoModal = () => {
  //   setIsCharacterInfoModal(!isCharacterInfoModal);
  // };

  return (
    <>
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
      {/* {!isCharacterInfoModal && <TabBar />} */}
    </>
  );
}

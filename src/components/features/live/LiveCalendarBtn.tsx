'use client';

import { LiveCalendar } from '@/components/features/live/LiveCalendar';
import { useLiveStore } from '@/store/live.store';
import { CalendarFold } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const LiveCalendarBtn = () => {
  const currentLive = useLiveStore(state => state.currentLive);

  const [isDropdownOpen, setIsDropDownOpen] = useState(false); // 드롭다운 오픈 상태
  const [isAnimation, setIsAnimation] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    setIsDropDownOpen(true);
    setTimeout(() => {
      setIsAnimation(true);
    }, 100);
    setIsBtnClicked(true);
  };
  const closeDropdown = () => {
    setIsAnimation(false);
    setTimeout(() => {
      setIsDropDownOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const [isSameTimeLives, setIsSameTimeLives] = useState(false);
  useEffect(() => {
    setIsSameTimeLives((currentLive?.length ?? 0) >= 2);
  }, [currentLive]);

  return (
    <>
      <button onClick={openDropdown} className="relative">
        <CalendarFold stroke="white" />
      </button>

      <div className='pr-3.5" absolute -top-3 -right-4'>
        {/* 동시간 라이브 */}
        {/* {isSameTimeLives && (
          <div
            className={`absolute top-12.5 right-0 mr-2 rounded-sm bg-white p-1 text-xs font-extrabold text-[#FE508B] transition-all duration-200 after:absolute after:-top-3 after:right-4 after:border-7 after:border-transparent after:border-b-white after:content-[''] ${isBtnClicked ? 'opacity-0' : 'animate-pulse'}`}
          >
            동시LIVE!
          </div>
        )} */}

        {isDropdownOpen && (
          <div ref={dropdownRef}>
            <div
              onClick={e => e.stopPropagation()}
              className={`relative z-20 w-[100vw] max-w-[600px] transition-all duration-200 ${isAnimation ? '-translate-y-0' : '-translate-y-[400px]'} `}
            >
              <LiveCalendar />
            </div>
            <div
              onClick={closeDropdown}
              className="absolute top-0 left-0 z-10 h-[100vh] w-[100vw] max-w-[600px] bg-black/50"
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

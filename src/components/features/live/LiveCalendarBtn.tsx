'use client';

import { LiveCalendar } from '@/components/features/live/LiveCalendar';
import { CalendarFold } from 'lucide-react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

export interface LiveDataType {
  id: number;
  start: moment.Moment;
  end: moment.Moment;
  title: string;
}

export const LiveCalendarBtn = ({ liveData }: { liveData: LiveDataType[] }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false); // 드롭다운 오픈 상태
  const [isAnimation, setIsAnimation] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    setIsDropDownOpen(true);
    setTimeout(() => {
      setIsAnimation(true);
    }, 100);
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

  return (
    <div>
      <button onClick={openDropdown}>
        <CalendarFold stroke="white" />
      </button>

      {/* 동시 라이브 알림
        TODO 헤더 삽입 후 위치 수정
      */}
      <div className="absolute -left-4 mr-2 w-fit rounded-lg bg-white p-1.5 text-xs font-extrabold text-[#FE508B] after:absolute after:-top-3 after:right-4 after:border-7 after:border-transparent after:border-b-white after:content-['']">
        동시 ON
      </div>

      {isDropdownOpen && (
        <>
          <div
            ref={dropdownRef}
            onClick={closeDropdown}
            className="absolute top-0 left-0 z-1 h-[100vh] w-full bg-black/50"
          ></div>
          <div
            className={`absolute z-2 transition-all duration-200 ${isAnimation ? '-translate-y-10' : '-translate-y-[400px]'} `}
          >
            <LiveCalendar liveData={liveData} />
          </div>
        </>
      )}
    </div>
  );
};

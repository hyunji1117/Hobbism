'use client';

import { LiveCalendar } from '@/components/features/live/LiveCalendar';
import { CalendarFold } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const LiveCalendarBtn = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
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
      <button onClick={toggleDropdown}>
        <CalendarFold stroke="white" />
      </button>

      {isDropdownOpen && (
        <>
          <div
            ref={dropdownRef}
            onClick={() => setIsDropDownOpen(false)}
            className="absolute top-0 left-0 z-1 h-[100vh] w-full bg-black/50"
          ></div>
          <div className="absolute top-0 z-2 w-full">
            <LiveCalendar />
          </div>
        </>
      )}
    </div>
  );
};

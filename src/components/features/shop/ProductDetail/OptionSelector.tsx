'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// 옵션 선택 컴포넌트
export const OptionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('사이즈');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <section className="h-auto rounded-[8px] border border-[#EAEAEA]">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between bg-transparent p-2"
        onClick={toggleDropdown}
      >
        <h2
          className={`text-[16px] ${
            selectedOption === '사이즈' ? 'text-[#999]' : 'text-[#000]'
          }`}
        >
          {selectedOption}
        </h2>
        <ChevronDown
          className={`h-[24px] w-[24px] text-black transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-[#EAEAEA]">
          <div
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('S')}
          >
            S
          </div>
          <div
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('M')}
          >
            M
          </div>
          <div
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('L')}
          >
            L
          </div>
          <div
            className="cursor-pointer p-2 text-[#666]"
            onClick={() => handleOptionClick('XL')}
          >
            XL
          </div>
        </div>
      )}
    </section>
  );
};

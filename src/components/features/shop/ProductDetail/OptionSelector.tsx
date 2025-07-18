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
    <section className="h-auto rounded-[8px] border border-[#EAEAEA] bg-white">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between bg-transparent p-2"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
        <ul
          className="border-t border-[#EAEAEA]"
          role="listbox"
          aria-label="옵션 선택"
        >
          <li
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('S')}
            role="option"
            aria-selected={selectedOption === 'S'}
          >
            S
          </li>
          <li
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('M')}
            role="option"
            aria-selected={selectedOption === 'M'}
          >
            M
          </li>
          <li
            className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
            onClick={() => handleOptionClick('L')}
            role="option"
            aria-selected={selectedOption === 'L'}
          >
            L
          </li>
          <li
            className="cursor-pointer p-2 text-[#666]"
            onClick={() => handleOptionClick('XL')}
            role="option"
            aria-selected={selectedOption === 'XL'}
          >
            XL
          </li>
        </ul>
      )}
    </section>
  );
};

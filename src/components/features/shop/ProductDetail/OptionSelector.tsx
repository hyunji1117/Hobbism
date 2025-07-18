'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// 옵션 선택 컴포넌트
export const OptionSelector = ({
  options,
  selectedOption, //추가
  onSelect,
}: {
  options: string[];
  selectedOption: string; //추가
  onSelect: (selectedOption: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="h-auto rounded-[8px] border border-[#EAEAEA] bg-white">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between bg-transparent p-2 text-black"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <h2 className="text-[16px] text-[#000]">
          {selectedOption || '옵션 선택'}
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
          {options.map(option => (
            <li
              key={option}
              className="cursor-pointer border-b border-[#EAEAEA] p-2 text-[#666]"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selectedOption === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

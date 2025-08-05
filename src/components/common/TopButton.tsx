'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TopButton() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowBtn = () => {
      setShowBtn(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleShowBtn);

    handleShowBtn();

    return () => {
      window.removeEventListener('scroll', handleShowBtn);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <div className="pointer-events-none fixed right-0 bottom-[10%] left-0 z-10 flex justify-center">
          <div className="pointer-events-auto relative mx-auto w-full max-w-[600px]">
            <button
              onClick={scrollTop}
              className="absolute right-3.5 bottom-0 aspect-square w-10 rounded-full bg-white shadow-[1px_3px_8px_#BEBEBE]"
            >
              <ChevronUp
                stroke="#1a1a1a"
                strokeWidth={1.5}
                fill="white"
                className="h-full w-full"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

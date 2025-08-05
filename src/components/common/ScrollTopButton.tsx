'use client';

import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const handleScroll = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (window.scrollY > 200) {
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="absolute -top-12 right-2 z-50 mx-auto flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#4A4A4A] shadow shadow-black/20"
        >
          <ChevronUp />
        </button>
      )}
    </>
  );
}

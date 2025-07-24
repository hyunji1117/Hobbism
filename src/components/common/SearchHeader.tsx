'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

//          component: 검색 버튼 컴포넌트          //
export default function SearchButton() {
  //          state: 검색 버튼 상태          //
  const inputRef = useRef<HTMLInputElement>(null);
  //          state: 검색 버튼 상태          //
  const [status, setStatus] = useState<boolean>(false);
  //          state: 검색어 상태          //
  const [word, setWord] = useState('');
  //          state: 검색어 path variable 상태          //
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('word');
  //          function: 라우터 함수          //
  const router = useRouter();

  const handleSearchClick = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
    setWord('');
  };

  const handleSubmit = () => {
    if (!word) return;
    router.push(`search?word=${encodeURIComponent(word)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  useEffect(() => {
    if (status && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  //          effect: 검색어 path variable 변경 될때 마다 실행할 함수          //
  useEffect(() => {
    if (searchWord) {
      console.log('searchWord', searchWord);
      setWord(searchWord);
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [searchWord]);

  if (!status)
    return (
      <button
        type="button"
        className="cursor-pointer rounded-full hover:bg-gray-100"
        onClick={handleSearchClick}
        aria-label="검색 시작"
      >
        <Search />
      </button>
    );

  return (
    <div className="fixed top-0 right-0 left-0 z-50 mx-auto flex h-12 w-full max-w-[600px] items-center bg-white px-4">
      <div
        className="mr-2 cursor-pointer rounded-full p-2 hover:bg-gray-100"
        onClick={handleSubmit}
      >
        <Search />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
        value={word}
        onChange={e => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={handleClose}
        className="ml-2 cursor-pointer rounded-full p-2 hover:bg-gray-100"
        aria-label="검색 닫기"
      >
        <X size={20} />
      </button>
    </div>
  );
}

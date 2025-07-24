'use client';
import { Search } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

//          component: 검색 버튼 컴포넌트          //
const SearchButton = () => {
  //          state: 검색어 버튼 요소 참조 상태          //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  //          state: 검색 버튼 상태          //
  const [status, setStatus] = useState<boolean>(false);
  //          state: 검색어 상태          //
  const [word, setWord] = useState<string>('');
  //          state: 검색어 path variable 상태          //
  const { searchWord } = useParams();
  //          function: 라우터 함수          //
  const router = useRouter();

  //          event handler: 검색 변경 이벤트 처리 함수          //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
  };
  //          event handler: 검색어 키 이벤트 처리 함수          //
  const onSearchWordKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current.click();
  };
  //          event handler: 검색 버튼 클릭 이벤트 처리 함수          //
  const onSearchButtonClickHandler = () => {
    if (!status) {
      setStatus(!status);
      return;
    }
    if (word === '') {
      setStatus(!status);
      return;
    }
    router.push(`search/word=${encodeURIComponent(word)}`);
  };

  //          effect: 검색어 path variable 변경 될때 마다 실행할 함수          //
  useEffect(() => {
    if (searchWord) {
      const wordString = Array.isArray(searchWord) ? searchWord[0] : searchWord;
      setWord(wordString);
      setStatus(true);
    }
  }, [searchWord]);

  if (!status)
    //          render: 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)          //
    return (
      <div
        className="cursor-pointer rounded-full hover:bg-gray-100"
        onClick={onSearchButtonClickHandler}
      >
        <Search />
      </div>
    );
  //          render: 검색 버튼 컴포넌트 렌더링 (클릭 true 상태)          //
  return (
    <div className="flex h-[24px] w-[223px] items-center gap-1 rounded-full border border-black/20 px-3">
      <input
        className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
        type="text"
        placeholder="검색어를 입력해주세요."
        value={word}
        onChange={onSearchWordChangeHandler}
        onKeyDown={onSearchWordKeyDownHandler}
      />
      <div
        ref={searchButtonRef}
        className="cursor-pointer rounded-full hover:bg-gray-100"
        onClick={onSearchButtonClickHandler}
      >
        <Search />
      </div>
    </div>
  );
};

export default SearchButton;

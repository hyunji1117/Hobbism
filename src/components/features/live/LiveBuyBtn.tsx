import Link from 'next/link';

export const LiveBuyBtn = () => {
  return (
    <>
      <Link
        href={'/'}
        className="rounded-lg bg-[#FE508B] p-2 text-xl font-bold text-white"
      >
        구매하기
      </Link>
    </>
  );
};

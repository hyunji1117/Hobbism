import Link from 'next/link';

export const LiveBuyBtn = ({ _id }: { _id: number }) => {
  return (
    <>
      <Link
        href={`/shop/${_id}`}
        className="rounded-lg bg-[#FE508B] p-2 text-xl font-bold text-white"
      >
        제품보기
      </Link>
    </>
  );
};

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '주문 완료 페이지',
  description: '주문 완료 페이지입니다.',
};

export default async function orderCompletedPage({
  params,
}: {
  params: Promise<{ orderId: number }>;
}) {
  const { orderId } = await params;

  return (
    <section className="mb-12 flex flex-1 flex-col items-center justify-center">
      <div className="relative flex aspect-square w-[38%] items-center justify-center">
        <Image
          fill
          src="/images/ayoung/bearWithBox.webp"
          alt=""
          priority={false}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <h1 className="mt-5 mb-2 text-center text-2xl font-bold text-[#4a4a4a]">
        주문 완료!
      </h1>
      <p className="mb-10 text-center text-[#4a4a4a]">
        고객님의 소중한 주문을 확인했어요. <br />
        지금부터 꼼꼼히 포장해드릴게요!
      </p>

      <div className="my-3 mb-10 flex w-full max-w-[600px] gap-2 px-4">
        <Link
          href={`/shop/order/${orderId}`}
          className="w-1/2 rounded-full border border-[#2C2F33] bg-white py-3 text-center font-semibold transition-all hover:bg-[#f4f4f4]"
        >
          주문 상세보기
        </Link>
        <Link
          href="/shop"
          className="w-1/2 rounded-full border border-[#2C2F33] bg-[#2C2F33] py-3 text-center font-semibold text-white transition-all hover:bg-[#44494f]"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </section>
  );
}

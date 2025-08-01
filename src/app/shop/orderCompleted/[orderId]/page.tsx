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

  console.log('orderId', orderId);
  return (
    <section className="mx-3.5 mt-19">
      <div className="absolute top-12 left-1/2 aspect-[1.4/1] w-[65%] -translate-x-1/2">
        <Image
          fill
          src="/images/ayoung/stars.webp"
          alt=""
          priority={false}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className="relative left-1/2 aspect-square w-[33%] -translate-x-1/2 -rotate-10 animate-bounce">
        <Image
          fill
          src="/images/ayoung/present.webp"
          alt=""
          priority={false}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <h1 className="mt-10 mb-2 text-center text-2xl font-bold">주문 완료!</h1>
      <p className="mb-10 text-center">
        고객님의 소중한 주문을 확인했어요. <br />
        지금부터 꼼꼼히 포장해드릴게요!
      </p>

      <div className="my-3 flex w-full gap-2">
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

import Image from 'next/image';

export function OrderProducts() {
  return (
    <li className="mt-3 flex gap-5">
      <div className="relative aspect-square w-20">
        <Image
          fill
          src="/images/ayoung/products/dress/ankrouge-03-01.webp"
          alt="상품 사진 1"
          priority={false}
          sizes="(max-width: 768px) 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="rounded-2xl"
        />
      </div>
      <div>
        <p className="text-sm font-bold">프리미엄 면 티셔츠</p>
        <p className="text-sm text-[#4B5563]">[85] M size</p>
        <p className="text-md font-semibold">29,000원</p>
      </div>
    </li>
  );
}

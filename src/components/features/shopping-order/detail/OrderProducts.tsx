import { OrderOptions, OrderProductType } from '@/types/orders';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function OrderProducts({
  products,
  options,
}: {
  products: OrderProductType[];
  options: OrderOptions[];
}) {
  return (
    <ul>
      {products.map(product => (
        <li className="mt-3 flex gap-5" key={product._id}>
          <div className="relative aspect-square w-20">
            <Image
              fill
              src={`${API_URL}/${product.image.path}`}
              alt={product.image.name}
              priority={false}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="rounded-2xl"
            />
          </div>
          <div className="leading-loose">
            <p className="text-sm font-bold">{product.name}</p>
            {options
              .filter(option => option._id === product._id)
              .map((option, i) => (
                <p className="text-sm text-[#4B5563]" key={i}>
                  {option.extra.color ?? ''}, {option.extra.size ?? ''}
                </p>
              ))}

            <p className="text-md font-semibold">
              {product.price}원{' '}
              <span className="font-normal text-[#4B5563]">
                {product.quantity}개
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

import { OrderProductType } from '@/types/orders';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function OrderProducts({ products }: { products: OrderProductType[] }) {
  return (
    <ul>
      {products.map(product => (
        <li className="mt-3 flex gap-5" key={product._id}>
          <div className="relative aspect-square w-20">
            <Image
              fill
              src={`${product.image.path}`}
              alt={product.image.name}
              priority={false}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="rounded-2xl"
            />
          </div>
          <div className="leading-loose">
            <p className="text-sm font-bold">{product.name}</p>

            {(product.size || product.color) && (
              <p className="text-sm text-[#4B5563]">
                <span className="mr-1">{product.size && product.size}</span>
                <span>{product.color && product.color}</span>
              </p>
            )}

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

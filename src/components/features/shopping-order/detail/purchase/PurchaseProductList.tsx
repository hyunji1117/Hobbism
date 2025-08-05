import { usePurchaseStore } from '@/store/order.store';
import Image from 'next/image';

export function PurchaseProductList() {
  const { purchaseData } = usePurchaseStore();
  return (
    <>
      <div className="mx-3.5 rounded-2xl border border-[#EAEAEA] p-3">
        <h2 className="border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
          주문 상품 {purchaseData.length}개
        </h2>
        <ul>
          {purchaseData.map(product => (
            <li
              className="mt-3 flex gap-5"
              key={product.cartId ? product.cartId : product.id}
            >
              <div className="relative aspect-square w-20">
                <Image
                  fill
                  src={product.productImg}
                  alt={product.productImg}
                  priority={true}
                  sizes="(max-width: 768px) 100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="rounded-2xl"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{product.name}</p>
                {(product.size || product.color) && (
                  <p className="text-sm text-[#4B5563]">
                    <span className="mr-1">{product.size && product.size}</span>
                    <span>{product.color && product.color}</span>
                  </p>
                )}
                <p className="text-md font-semibold">
                  {product.price * product.quantity}원{' '}
                  <span className="font-normal text-[#4B5563]">
                    {product.quantity}개
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

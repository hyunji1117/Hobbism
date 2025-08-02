import { usePurchaseStore } from '@/store/order.store';

export function PaymentSummary() {
  const { purchaseData } = usePurchaseStore();
  console.log('purchaseData', purchaseData);

  return (
    <>
      {purchaseData.map(product => {
        const total = (product.price * product.quantity).toLocaleString();
        const originalTotal = product.originalPrice
          ? (product.originalPrice * product.quantity).toLocaleString()
          : total;
        const sale = (
          (product.originalPrice ? product.originalPrice - product.price : 0) *
          product.quantity
        ).toLocaleString();
        return (
          <div className="mx-3.5 mb-5" key={product.id}>
            <span className="mb-2 flex w-full justify-between border-b border-b-[#EAEAEA] pb-2 text-lg font-bold">
              <h2>총 결제 금액</h2>
              <p>{total}원</p>
            </span>
            <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-2 text-sm">
              <dt>총 상품 금액</dt>
              <dd className="text-right">{originalTotal}원</dd>
              <dt>할인 금액</dt>
              <dd className="text-right">{sale}원</dd>
            </dl>
          </div>
        );
      })}
    </>
  );
}

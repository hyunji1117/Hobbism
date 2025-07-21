import { ShopLiveProducts } from '@/components/features/shop/ShopLiveProducts';
import { fetchLiveProducts } from '@/data/functions/LiveProductFetch';
import { Product } from '@/types/interface/product';
import { useEffect, useState } from 'react';

export default function ShopLiveList() {
  /* 라이브 특별 기획 상품 */
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    const liveDataList = async () => {
      const liveData = await fetchLiveProducts();
      const liveFiltered = liveData.filter(
        product => product.extra.isLiveSpecial,
      );
      setLiveProducts(liveFiltered);
    };

    liveDataList();
  }, []);
  return (
    <>
      <section className="ml-5">
        <h2 className="py-4 text-lg font-semibold">라이브 특별 기획 상품</h2>
        <ShopLiveProducts liveData={liveProducts} />
      </section>
    </>
  );
}

import ShopList from '@/app/shop/ShopList';
import { RandomHobbyBtn } from '@/components/features/shop/RandomHobby/RandomHobbyBtn';
import { ShopBanner } from '@/components/features/shop/ShopBanner';
import { ShopLiveProducts } from '@/components/features/shop/ShopLiveProducts';
import { fetchAllProducts, fetchProducts } from '@/data/functions/ProductFetch';
import filterValidProducts from '@/utils/product';
import moment from 'moment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑 페이지',
  description: '쇼핑 페이지입니다.',
};

export default async function ShopPage() {
  const now = moment();
  const isThisMonth = (dateStr?: string) => {
    if (!dateStr) return false;
    const date = moment(dateStr);
    return date.month() === now.month() && date.year() === now.year();
  };

  const initialData = await fetchProducts(1);
  const initialFiltered = filterValidProducts(initialData);
  const liveData = await fetchAllProducts();
  const initialLiveFiltered = liveData
    .filter(product => product.extra.isLiveSpecial)
    .filter(product => isThisMonth(product.extra.live?.start));

  return (
    <>
      {/* 메인 배너 */}
      <section>
        <ShopBanner />
      </section>

      {/* 라이브 특별 기획 상품 */}
      <section className="ml-5 text-[#4a4a4a]">
        <h2 className="py-4 text-lg font-semibold">라이브 특별 기획 상품</h2>
        <ShopLiveProducts liveData={initialLiveFiltered} />
      </section>

      {/* 오늘의 취미 랜덤 뽑기 */}
      <RandomHobbyBtn />

      {/* 전체(카테고리 별) 상품 */}
      <ShopList initialData={initialFiltered} />
    </>
  );
}

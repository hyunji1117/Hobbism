import ShopList from '@/app/shop/ShopList';
import { RandomHobbyBtn } from '@/components/features/shop/RandomHobby/RandomHobbyBtn';
import { ShopBanner } from '@/components/features/shop/ShopBanner';
import { ShopLiveProducts } from '@/components/features/shop/ShopLiveProducts';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { fetchLiveProducts } from '@/data/functions/AllProductFetch';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑 페이지',
  description: '쇼핑 페이지입니다.',
};

export default async function ShopPage() {
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const initialData = await fetchProducts(1); // 서버에서 (page)번 페이지 게시물 받아옴
  const liveData = await fetchLiveProducts();
  const initialLiveFiltered = liveData.filter(
    product => product.extra.isLiveSpecial,
  );

  return (
    <>
      {/* 메인 배너 */}
      <section>
        <ShopBanner />
      </section>

      {/* 라이브 특별 기획 상품 */}
      <section className="ml-5">
        <h2 className="py-4 text-lg font-semibold">라이브 특별 기획 상품</h2>
        <ShopLiveProducts liveData={initialLiveFiltered} />
      </section>

      {/* 오늘의 취미 랜덤 뽑기 */}
      <RandomHobbyBtn />

      {/* 전체(카테고리 별) 상품 */}
      <ShopList initialData={initialData} />
      <TabBar />
    </>
  );
}

import ShopList from '@/app/shop/ShopList';
import ShopLiveList from '@/app/shop/ShopLiveList';
import { ShopBanner } from '@/components/features/shop/ShopBanner';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑 페이지',
  description: '쇼핑 페이지입니다.',
};

export default async function ShopPage() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const initialData = await fetchProducts(1); // 서버에서 (page)번 페이지 게시물 받아옴

  return (
    <>
      {/* 메인 배너 */}
      <section>
        <ShopBanner />
      </section>

      {/* 라이브 특별 기획 상품 */}
      <ShopLiveList />
      {/* 전체(카테고리 별) 상품 */}
      <ShopList initialData={initialData} />
      <TabBar />
    </>
  );
}

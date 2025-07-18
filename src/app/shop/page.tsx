import ShopList from '@/app/shop/ShopList';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑 페이지',
  description: '쇼핑 페이지입니다.',
};

export default async function ShopPage() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
    <>
      {/* 전체(카테고리 별) 상품 */}
      <ShopList />
      <TabBar />
    </>
  );
}

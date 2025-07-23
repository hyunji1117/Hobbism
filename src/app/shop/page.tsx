import { ShopAd } from '@/components/features/shop/ShopAd';
import { ShopBanner } from '@/components/features/shop/ShopBanner';
import { ShopCategory } from '@/components/features/shop/ShopCategory';
import { ShopLiveProducts } from '@/components/features/shop/ShopLiveProducts';
import { ShopProduct } from '@/components/features/shop/ShopProduct';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쇼핑 페이지',
  description: '쇼핑 페이지입니다.',
};

export default async function ShopPage() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const data = await fetchProducts();
  // console.log('API 서버로부터 받은 상품 목록 수', data.length);
  console.log(data);

  const products = data.map(product => (
    <ShopProduct
      _id={product._id}
      price={product.price}
      name={product.name}
      mainImageSrc={product.mainImages[0]?.path}
      category={product.extra.category}
      isLiveSpecial={product.extra.isLiveSpecial}
      discountRate={product.extra.discountRate}
      discountPrice={product.extra.discountedPrice}
      key={product._id}
    />
  ));

  return (
    <>
      {/* 메인 배너 */}
      <section>
        <ShopBanner />
      </section>

      {/* 라이브 특별 기획 상품 */}
      <section className="ml-5">
        <h2 className="py-4 text-lg font-semibold">라이브 특별 기획 상품</h2>
        {/* <ShopLiveProducts /> */}
      </section>

      {/* 전체(카테고리 별) 상품 */}
      <section>
        <div className="ml-5">
          <ShopCategory />
        </div>

        <div className="mx-5">
          <div className="grid grid-cols-2 gap-2.5">
            {products}
            <ShopAd />
          </div>
        </div>
      </section>
      <TabBar />
    </>
  );
}

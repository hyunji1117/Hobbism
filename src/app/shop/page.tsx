import { ShopAd } from '@/components/features/shop/ShopAd';
import { ShopBanner } from '@/components/features/shop/ShopBanner';
import { ShopCategory } from '@/components/features/shop/ShopCategory';
import { ShopLiveProducts } from '@/components/features/shop/ShopLiveProducts';
import { ShopProduct } from '@/components/features/shop/ShopProduct';
import TabBar from '@/components/layout/tabbar/Tabbar';

export default function ShopPage() {
  return (
    <>
      {/* 메인 배너 */}
      <section>
        <ShopBanner />
      </section>

      {/* 라이브 특별 기획 상품 */}
      <section className="ml-5">
        <h2 className="py-4 text-lg font-semibold">라이브 특별 기획 상품</h2>
        <ShopLiveProducts />
      </section>

      {/* 전체(카테고리 별) 상품 */}
      <section>
        <div className="ml-5">
          <ShopCategory />
        </div>

        <div className="mx-5">
          <div className="grid grid-cols-2 gap-2.5">
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />

            <ShopAd />

            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
            <ShopProduct wid="w-full" />
          </div>
        </div>
      </section>
      <TabBar />
    </>
  );
}

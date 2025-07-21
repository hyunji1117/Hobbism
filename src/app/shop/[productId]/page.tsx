import Image from 'next/image';
import Tabbar from '@/components/layout/tabbar/Tabbar';
import { CartProvider } from '@/components/features/shop/ProductDetail/CartContext';
import { HeaderNav } from '@/components/layout/header/Header';
import { ProductDetailInfo } from '@/components/features/shop/ProductDetail/ProductDetail';
import ProductDetailClient, {
  CartIcon,
  GoBackButton,
} from '@/components/features/shop/ProductDetail/ProductDetailClient';

export default async function ProductPage() {
  // 서버 product data Fetch 예정
  const price = 158900;
  const imageUrl =
    'https://fesp-api.koyeb.app/market/files/febc13-final01-emjf/{data.content.path}';

  return (
    <CartProvider>
      <HeaderNav>
        <HeaderNav.LeftContent>
          {/* 뒤로가기 버튼을 클라이언트 컴포넌트에서 다룸 */}
          <GoBackButton />
        </HeaderNav.LeftContent>
        <HeaderNav.Title>제품상세</HeaderNav.Title>
        <HeaderNav.RightContent>
          <CartIcon />
        </HeaderNav.RightContent>
      </HeaderNav>

      <div className={`relative mb-1 aspect-square w-full`}>
        <Image
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          src={imageUrl}
          alt="ankrouge"
          className="pointer-events-none"
        />
      </div>
      <ProductDetailInfo />

      <h2 className="p-5 text-[18px] font-semibold">상품정보</h2>
      <div className="relative mb-1 w-full">
        <Image
          layout="intrinsic"
          width={1920}
          height={1080}
          src="/images/hyunji/interior_02_01.webp"
          alt="ankrouge"
          className="pointer-events-none"
        />
      </div>

      {/* 하위 클라이언트 컴포넌트로 묶어서 이동 */}
      <ProductDetailClient price={price} />

      <Tabbar />
    </CartProvider>
  );
}

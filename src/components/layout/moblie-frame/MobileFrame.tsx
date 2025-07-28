import { CartProvider } from '@/components/features/shop/ProductDetail/CartContext';
import Header from '@/components/layout/header/Header';
import TabBar from '@/components/layout/tabbar/Tabbar';
import { PropsWithChildren } from 'react';

export function MobileFrame({ children }: PropsWithChildren) {
  return (
    <CartProvider>
      <div className="frame-guideline relative mx-auto h-screen w-full max-w-[600px]">
        <Header />
        {children}
        <TabBar />
      </div>
    </CartProvider>
  );
}

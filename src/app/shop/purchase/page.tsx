import PurchaseClient from '@/app/shop/purchase/PurchaseClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '결제 페이지',
  description: '결제 페이지입니다.',
};

export default function purchasePage() {
  return <PurchaseClient />;
}

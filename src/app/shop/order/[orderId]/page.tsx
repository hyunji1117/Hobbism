import OrderDetailClient from '@/app/shop/order/[orderId]/OrderDetailClient';

export default async function orderDetailPage({
  params,
}: {
  params: Promise<{ orderId: number }>;
}) {
  const { orderId } = await params;

  return <OrderDetailClient orderId={orderId} />;
}

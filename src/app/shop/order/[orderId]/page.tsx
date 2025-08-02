import OrderDetailClient from '@/app/shop/order/[orderId]/OrderDetailClient';
import { fetchOrderDetail } from '@/data/functions/OrdersFetch';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function orderDetailPage({
  params,
}: {
  params: Promise<{ orderId: number }>;
}) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return <p>로그인이 필요합니다.</p>;
  }

  const { orderId } = await params;
  const order = await fetchOrderDetail(accessToken, orderId);

  if (!order || !order.item) {
    return <p>주문 정보를 불러올 수 없습니다.</p>;
  }

  const { item } = order;
  const user = item.user;
  const address = item.address;
  const payment = item.selectedPayment;
  const cost = item.cost;
  const products = item.products;

  return (
    <OrderDetailClient
      orderId={orderId}
      user={user}
      address={address}
      payment={payment}
      cost={cost}
      products={products}
    />
  );
}

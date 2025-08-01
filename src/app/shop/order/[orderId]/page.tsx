import OrderDetailClient from '@/app/shop/order/[orderId]/OrderDetailClient';
import { getUserAttribute } from '@/data/actions/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function orderDetailPage({
  params,
}: {
  params: Promise<{ orderId: number }>;
}) {
  const { orderId } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    throw new Error('로그인이 필요합니다.');
  }

  const addressRes = await getUserAttribute(session.user._id, 'address');
  const addressDetailRes = await getUserAttribute(
    session.user._id,
    'extra/detail_address',
  );
  const postcodeRes = await getUserAttribute(
    session.user._id,
    'extra/postcode',
  );

  const name = session.user?.name ?? '';
  const phone = session.user?.phone ?? '';

  if (
    addressRes.ok !== 1 ||
    addressDetailRes.ok !== 1 ||
    postcodeRes.ok !== 1
  ) {
    return <div>주소 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <OrderDetailClient
      orderId={orderId}
      userInfo={{ name, phone }}
      addressInfo={{
        address: addressRes.item.address,
        detailAddress: addressDetailRes.item.extra.detail_address,
        postcode: postcodeRes.item.extra.postcode,
      }}
    />
  );
}

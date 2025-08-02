import PurchaseClient from '@/app/shop/purchase/PurchaseClient';
import { getUserAttribute } from '@/data/actions/user';
import { authOptions } from '@/lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: '결제 페이지',
  description: '결제 페이지입니다.',
};

export default async function purchasePage() {
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
    <>
      <PurchaseClient
        userInfo={{ name, phone }}
        addressInfo={{
          address: addressRes.item.address,
          detailAddress: addressDetailRes.item.extra.detail_address,
          postcode: postcodeRes.item.extra.postcode,
        }}
      />
    </>
  );
}

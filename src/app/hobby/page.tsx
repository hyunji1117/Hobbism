import HobbyItem from '@/components/features/hobby/HobbyItem';
import HobbySelector from '@/components/features/hobby/HobbySelector';
import { HOBBY_ITEMS } from '@/constant/hobby';
import { getUserAttribute } from '@/data/actions/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HobbyPage() {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  if (!session?.user?._id) {
    redirect('/login');
    // throw new Error('로그인이 필요합니다');
  }

  const res = await getUserAttribute(session?.user._id, 'extra/hobby');

  if (res.ok !== 1) {
    throw new Error('유저 취미 정보를 가져오지 못했습니다');
  }

  const selectedHobby = res.item?.extra?.hobby ?? null;

  return (
    <main className="flex min-h-full flex-1 flex-col gap-2 bg-white px-4 pt-12 text-[#4a4a4a]">
      <div className="mt-3 flex flex-col gap-2">
        <p className="text-xl font-semibold">다양한 취미를 즐겨보세요</p>
        <p className="text-base font-medium text-gray-500">
          하비즘에 등록된 취미
        </p>
      </div>
      <HobbySelector defaultHobby={selectedHobby} />
    </main>
  );
}

import { getUserInfo } from '@/data/actions/user';
import { UserEditForm } from '@/components/features/user/UserEditForm';

export default async function UserEditPage() {
  const user = await getUserInfo(1);

  if (user.ok === 0 || !user) return null;
  return (
    <div className="flex h-full flex-col">
      <UserEditForm user={user.item} />
    </div>
  );
}

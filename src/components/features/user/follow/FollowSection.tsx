import { UserPreviewCard } from '@/components/features/user/UserPreviewCard';

import { Bookmark } from '@/types';

export default function FollowSection({ byUser }: { byUser: Bookmark[] }) {
  return (
    <>
      {byUser.map(bookmark => (
        <UserPreviewCard
          key={bookmark._id}
          variant="horizontal"
          id={bookmark.user._id}
          image={
            bookmark.user.image
              ? `https://fesp-api.koyeb.app/market/${bookmark.user.image}`
              : `/images/default-profile-image.webp`
          }
          introduction={bookmark.user.extra?.introduction ?? ''}
          name={bookmark.user.name}
          bookmarkId={bookmark._id}
        />
      ))}
    </>
  );
}

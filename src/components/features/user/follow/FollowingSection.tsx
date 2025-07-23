import UserPreviewCard from '@/components/features/user/UserPreviewCard';

import { Bookmark } from '@/types';

export default function FollowingSection({ user }: { user: Bookmark[] }) {
  return (
    <>
      {user.map(bookmark => {
        let imageUrl = '/images/default-profile-image.webp';
        if (bookmark.user.image) {
          imageUrl = `https://fesp-api.koyeb.app/market/${bookmark.user.image}`;
        }
        return (
          <UserPreviewCard
            key={bookmark._id}
            variant="horizontal"
            id={bookmark.user._id}
            image={imageUrl}
            introduction={bookmark.user.extra?.introduction ?? ''}
            name={bookmark.user.name}
            bookmarkId={bookmark._id}
          />
        );
      })}
    </>
  );
}

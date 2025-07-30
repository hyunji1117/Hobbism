import UserPreviewCard from '@/components/features/user/UserPreviewCard';

import { Bookmark } from '@/types';
import { getUserImageUrl } from '@/utils';

export default function FollowingSection({ user }: { user: Bookmark[] }) {
  return (
    <>
      {user.map(bookmark => {
        console.log('bookmark', bookmark._id);
        return (
          <UserPreviewCard
            key={bookmark._id}
            variant="horizontal"
            id={bookmark.user._id}
            image={getUserImageUrl(bookmark.user.image)}
            introduction={bookmark.user.extra?.introduction ?? ''}
            name={bookmark.user.name}
            bookmarkId={bookmark._id}
          />
        );
      })}
    </>
  );
}

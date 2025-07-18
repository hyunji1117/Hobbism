import CommunityHeader from '@/components/features/community/community-common/CommunityHeader';
import FeedCategorySelect from '@/components/features/community/community-create/FeedCategorySelect';
import FeedContentInput from '@/components/features/community/community-create/FeedContentInput';
import FeedImageUpload from '@/components/features/community/community-create/FeedImageUpload';
import FeedSubmitButton from '@/components/features/community/community-create/FeedSubmitButton';

export function WritePage() {
  return (
    <div className="min-h-screen">
      <div className="pt-5">
        <CommunityHeader title="피드등록" />
        <hr className="mt-2" />
      </div>
      <div className="mt-9">
        <FeedImageUpload />
      </div>
      <div className="mt-9">
        <FeedContentInput />
      </div>
      <div className="mt-9">
        <FeedCategorySelect />
      </div>
      <div className="mt-28 text-center">
        <FeedSubmitButton />
      </div>
    </div>
  );
}
export default WritePage;

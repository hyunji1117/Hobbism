// import CommunityHeader from '@/components/features/community/community-common/CommunityHeader';
import WriteForm from '@/components/features/community/community-create/FeedWriteForm';

export default async function WritePage() {
  return (
    <div className="flex h-[calc(100%-48px)] min-h-[calc(100%-48px)] flex-col p-4">
      <WriteForm />
    </div>
  );
}

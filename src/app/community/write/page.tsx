'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommunityHeader from '@/components/features/community/community-common/CommunityHeader';
import FeedCategorySelect from '@/components/features/community/community-create/FeedCategorySelect';
import FeedContentInput from '@/components/features/community/community-create/FeedContentInput';
import FeedImageUpload from '@/components/features/community/community-create/FeedImageUpload';
import FeedSubmitButton from '@/components/features/community/community-create/FeedSubmitButton';

export default function WritePage() {
  const router = useRouter();

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    images: [] as string[],
  });

  // 제출 처리 (실제 API 호출)
  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요!');
      return;
    }

    try {
      // Bruno 파일에서 본 API 구조 사용
      const postData = {
        type: 'community',
        title: formData.title || '제목 없음',
        content: formData.content,
        image: formData.images[0] || '',
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('게시물이 등록되었습니다!');
        router.push('/community');
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="pt-5">
        <CommunityHeader title="피드등록" />
        <hr className="mt-2" />
      </div>

      <div className="mt-9">
        <FeedImageUpload
          images={formData.images}
          onChange={images => setFormData({ ...formData, images })}
        />
      </div>

      <div className="mt-9">
        <FeedContentInput
          value={formData.content}
          onChange={value => setFormData({ ...formData, content: value })}
        />
      </div>

      <div className="mt-9">
        <FeedCategorySelect
          value={formData.category}
          onChange={category => setFormData({ ...formData, category })}
        />
      </div>

      <div className="mt-28 text-center">
        <FeedSubmitButton
          onClick={handleSubmit}
          disabled={!formData.content.trim()}
        />
      </div>
    </div>
  );
}

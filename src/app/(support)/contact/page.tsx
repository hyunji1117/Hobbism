'use client';

import { createPost, deletePost, getPosts } from '@/data/actions/post';
import { useAuthStore } from '@/store/auth.store';
import { Post } from '@/types';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function QnaPage() {
  const { accessToken } = useAuthStore();

  const [qnaList, setQnaList] = useState<Post[]>([]);
  const [question, setQuestion] = useState('');
  const [isModal, setIsModal] = useState(false);

  const fetchQnaList = async () => {
    const res = await getPosts('qna');
    if (res.ok) {
      setQnaList(res.item);
    }
  };

  useEffect(() => {
    fetchQnaList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const formData = new FormData();
    formData.append('type', 'qna');
    formData.append('content', question);
    if (accessToken) formData.append('accessToken', accessToken);

    await createPost(null, formData);
    fetchQnaList();
    setQuestion('');
    setIsModal(false);
  };

  const handleDelete = async (_id: number) => {
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const res = await deletePost(_id, accessToken);
    if (res.ok) {
      await fetchQnaList();
    } else {
      alert('삭제 실패: ' + res.message);
    }
  };

  const handleModalOpen = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* 고객센터 안내 배너 */}
      <div className="] mb-10 p-8 text-center">
        <h1 className="mb-3 text-3xl font-extrabold text-[#FE508B]">
          Hobbism 고객센터
        </h1>
        <p className="text-lg leading-relaxed font-medium text-gray-700 drop-shadow">
          <span className="mb-1 block">
            문제가 생기셨나요?{' '}
            <span className="font-bold text-[#FE508B]">걱정 마세요!</span>
          </span>
          <span className="mb-1 block">
            아래 <span className="font-bold text-[#FE508B] underline">FAQ</span>
            를 확인하거나,
          </span>
          <span className="block">
            궁금한 점은{' '}
            <span className="font-bold text-yellow-500">지금 바로 문의</span>해
            주세요.
          </span>
        </p>
      </div>

      {/* QnA 문의 입력 영역 */}
      <div className="relative bottom-10 text-center">
        <button
          className="rounded-xl bg-[#FE508B] px-6 py-2 text-lg font-semibold text-white shadow hover:bg-[#ff6fa6]"
          onClick={handleModalOpen}
        >
          지금 바로 문의하기
        </button>
      </div>
      {isModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="relative mx-2 flex w-full max-w-md flex-col items-center rounded-xl bg-white px-3 py-8 shadow-lg">
            <X
              size={28}
              onClick={() => setIsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="close button"
            />

            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-700">
              문의하기 (QnA)
            </h2>
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <input
                type="text"
                className="flex-1 rounded-xl border px-3 py-2 text-lg shadow"
                placeholder="문의사항을 입력하세요."
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-[#FE508B] px-5 font-semibold text-white shadow hover:bg-[#ff6fa6]"
              >
                등록
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAQ 영역 */}
      <div className="mt-5">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-700">
          자주 묻는 질문 (FAQ)
        </h2>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <ul className="space-y-2">
            {qnaList.length === 0 && (
              <li className="text-gray-400">등록된 문의가 없습니다.</li>
            )}
            {qnaList.map(q => (
              <li
                key={q._id}
                className="relative flex items-center justify-between rounded border bg-gray-50 px-3 py-2 hover:shadow"
              >
                <Link href={`/contact/${q._id}`} className="flex-1">
                  <span className="font-semibold text-[#FE508B]">Q.</span>{' '}
                  {q.content}
                </Link>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="ml-2 text-xs text-[#FE508B] hover:underline"
                  title="문의 삭제"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 고객센터 안내 */}
      <hr className="mt-10" />
      <div className="my-8">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700">
          <span>📞</span> 고객센터 운영 안내
        </h2>
        <p className="text-base text-gray-700">
          <span className="font-semibold text-gray-600">전화 상담:</span>{' '}
          02-1234-5678 (평일 09:00~18:00)
          <br />
          <span className="font-semibold text-gray-600">이메일:</span>{' '}
          hobbism@example.com
        </p>
        <div className="mt-4 text-sm text-gray-400">
          * 문의하신 내용은 영업일 기준 24시간 이내에 답변드립니다.
        </div>
      </div>
    </div>
  );
}

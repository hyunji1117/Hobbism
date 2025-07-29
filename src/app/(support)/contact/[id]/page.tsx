'use client';

import {
  createReply,
  deleteReply,
  getPostDetail,
  getReplies,
} from '@/data/actions/post';
import { useAuthStore } from '@/store/auth.store';
import { Post, PostReply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function QnaReplyPage() {
  const params = useParams();
  const { user, accessToken } = useAuthStore();
  const _id = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<PostReply[]>([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getPostDetail(Number(_id));
      if (res.ok) setPost(res.item);
    };
    fetchDetail();
  }, [_id]);

  // 댓글 목록 조회
  const fetchReplies = async () => {
    const res = await getReplies(Number(_id));
    if (res.ok) setReplies(res.item);
  };

  useEffect(() => {
    fetchReplies();
  }, [_id]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    const formData = new FormData();
    formData.append('_id', String(_id));
    formData.append('content', reply);
    if (accessToken) formData.append('accessToken', accessToken);

    await createReply(null, formData);
    setReply('');
    fetchReplies();
  };

  const handleDeleteRelpy = async (
    _id: number,
    reply_id: number,
    accessToken: string | null,
  ) => {
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const res = await deleteReply(_id, accessToken, reply_id);
    if (res.ok) {
      await fetchReplies();
      return;
    } else {
      alert('삭제 실패' + res.message);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-2 text-lg font-semibold">질문</h2>
      {/* 문의 상세 */}
      <div className="mb-6 rounded border bg-gray-50 p-4">
        <div className="mb-2 font-semibold text-[#FE508B]">Q.</div>
        <div className="text-gray-800">{post?.content}</div>
      </div>

      {/* 댓글 목록 */}
      <h2 className="mb-2 text-lg font-semibold">댓글</h2>
      <ul className="relative space-y-2">
        {replies.length === 0 && (
          <li className="text-gray-400">등록된 댓글이 없습니다.</li>
        )}
        {replies.map(r => (
          <li key={r._id} className="rounded border bg-gray-50 px-3 py-2">
            <span className="font-semibold text-[#FE508B]">A.</span> {r.content}
            <span className="absolute right-12 bottom-3 text-xs text-gray-500">
              (작성자: {user?.name})
            </span>
            {user?._id === r.user?._id && (
              <button
                onClick={() =>
                  handleDeleteRelpy(Number(_id), r._id, accessToken)
                }
                className="absolute right-4 bottom-3 ml-2 text-xs text-[#FE508B] hover:underline"
                title="문의 삭제"
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* 댓글 입력 폼 */}
      <form
        className="relative top-105 flex gap-2 bg-white px-4"
        onSubmit={handleReplySubmit}
      >
        <input
          type="text"
          className="flex-1 rounded border px-3 py-2"
          placeholder="댓글을 입력하세요"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button
          type="submit"
          className="rounded bg-[#FE508B] px-4 py-2 text-white"
        >
          등록
        </button>
      </form>
    </div>
  );
}

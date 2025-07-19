'use server';
import { ApiResPromise, PostList } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 게시판 타입에 해당하는 게시글 목록을 가져옵니다.
 * @param {string} boardType - 게시판 타입(예: notice, free 등)
 * @returns {Promise<ApiRes<PostList[]>>} - 게시글 목록 응답 객체
 */
export async function getUserPosts(
  _id: number,
  boardType: string,
): ApiResPromise<PostList[]> {
  try {
    console.log('id', _id);

    const res = await fetch(`${API_URL}/posts/users/${_id}?type=${boardType}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

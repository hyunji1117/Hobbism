'use server';
import { ApiRes, Post, PostReply, ApiResPromise, PostList } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

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
//  * 게시글을 생성하는 함수
//  */
export async function createPost(
  state: ApiRes<Post> | null,
  formData: FormData,
): ApiResPromise<Post> {
  let imageUrls: string[] = [];

  // 1단계: 이미지가 있으면 먼저 업로드
  const imageFile = formData.get('images') as File;
  if (imageFile && imageFile.size > 0) {
    const fileFormData = new FormData();
    fileFormData.append('attach', imageFile);

    try {
      const fileRes = await fetch(`${API_URL}/files`, {
        method: 'POST',
        headers: {
          'Client-Id': CLIENT_ID,
        },
        body: fileFormData,
      });

      const fileResult = await fileRes.json();

      if (fileResult.ok) {
        imageUrls = [fileResult.item[0].path];
      }
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      return { ok: 0, message: '이미지 업로드에 실패했습니다.' };
    }
  }

  // 2단계: 게시글 등록
  const body = {
    type: formData.get('type'),
    content: formData.get('content'),
    category: formData.get('category'),
    ...(imageUrls.length > 0 && { image: imageUrls }),
  };

  let data: ApiRes<Post>;

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${formData.get('accessToken')}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  // redirect를 try 밖으로 이동
  if (data.ok) {
    revalidatePath(`/${body.type}`); // 목록 페이지 캐시 갱신
    revalidatePath(`/${body.type}/${data.item._id}`); // 상세페이지 캐시 갱신
    redirect(`/${body.type}/${data.item._id}`); // 게시글 상세페이지로 이동
  } else {
    return data;
  }
}

/**
 * 댓글을 생성하는 함수
 */
export async function createReply(
  state: ApiRes<PostReply> | null,
  formData: FormData,
): ApiResPromise<PostReply> {
  const body = {
    content: formData.get('content'),
  };

  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let data: ApiRes<PostReply>;

  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`posts/${_id}/replies`); // 댓글 목록 캐시 무효화
    revalidateTag(`posts/${_id}`); // 게시글 상세 캐시 무효화
  }

  return data;
}

// 댓글 조회
const CLIENT_ID = process.env.CLIENT_ID;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchComments(_id: number) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/posts/${_id}/replies`,
      {
        headers: { 'Client-Id': CLIENT_ID || '' },
      },
    );
    if (!response.ok) throw new Error('댓글 조회 실패');
    return await response.json();
  } catch (error) {
    console.log('댓글 조회 오류', error);
  }
}

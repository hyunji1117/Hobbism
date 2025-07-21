// 댓글 조회
export async function fetchComments(_id: number) {
  try {
    const response = await fetch(
      `https://fesp-api.koyeb.app/market/posts/${_id}/replies`,
      {
        headers: { 'Client-Id': 'febc13-final01-emjf' },
      },
    );
    if (!response.ok) throw new Error('댓글 조회 실패');
    return await response.json();
  } catch (error) {
    console.log('댓글 조회 오류', error);
  }
}

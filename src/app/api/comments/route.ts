import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// 댓글 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    if (!postId) {
      return NextResponse.json(
        { error: 'postId가 필요합니다.' },
        { status: 400 },
      );
    }
    const response = await fetch(
      `https://fesp-api.koyeb.app/market/posts/${postId}/replies`,
      {
        headers: {
          'Client-Id': 'febc13-final01-emjf',
        },
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 조회 실패', error);
    return NextResponse.json(
      { error: '댓글을 불러올 수 없습니다.' },
      { status: 500 },
    );
  }
}

// 댓글 등록
export async function POST(request: NextRequest) {
  try {
    const { _id, content } = await request.json();
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/posts/${_id}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
        },
        body: JSON.stringify({ _id, content }),
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 등록 실패', error);
  }
}

// 댓글 수정
export async function PATCH(request: NextRequest) {
  try {
    const { _id, reply_id, content } = await request.json();
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/posts/${_id}/replies/${reply_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
        },
        body: JSON.stringify({ content }),
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 수정 실패', error);
  }
}

// 댓글 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');
    const reply_id = searchParams.get('reply_id');
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/posts/${_id}/replies/${reply_id}`,
      {
        method: 'DELETE',
        headers: {
          'Client-Id': NEXT_PUBLIC_CLIENT_ID || '',
        },
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 삭제 실패', error);
  }
}

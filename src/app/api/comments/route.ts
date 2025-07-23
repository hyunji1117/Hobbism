// 댓글 등록, 수정, 삭제 기능

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { _id, content } = await request.json();
    const response = await fetch(
      `https://fesp-api.koyeb.app/market/posts/${_id}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': 'febc13-final01-emjf',
        },
        body: JSON.stringify({ _id, content }),
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 등록 실패', error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { _id, reply_id, content } = await request.json();
    const response = await fetch(
      `https://fesp-api.koyeb.app/market/posts/${_id}/replies/${reply_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': 'febc13-final01-emjf',
        },
        body: JSON.stringify({ content }),
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 수정 실패', error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');
    const reply_id = searchParams.get('reply_id');

    const response = await fetch(
      `https://fesp-api.koyeb.app/market/posts/${_id}/replies/${reply_id}`,
      {
        method: 'DELETE',
        headers: {
          'Client-Id': 'febc13-final01-emjf',
        },
      },
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    console.log('댓글 삭제 실패', error);
  }
}

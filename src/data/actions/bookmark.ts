'use server';

import { ApiResPromise, Bookmark } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function postBookmark(
  type: 'product' | 'user' | 'post',
  target_id: number,
): ApiResPromise<Bookmark> {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyasOuvvOyehCIsImVtYWlsIjoid29vbWluMDEzQGdtYWlsLmNvbSIsImltYWdlIjoiZmlsZXMvZmViYzEzLWZpbmFsMDEtZW1qZi9CWERmTkx0X0kud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzUzMDU3NTE3LCJleHAiOjE3NTMxNDM5MTcsImlzcyI6IkZFQkMifQ.8jUASSmXW6Vj_QJSXVMVb3ZZ2tjCtqgiOwgfhh0sGnQ';
  try {
    const body = {
      type,
      target_id,
    };
    console.log(body);
    const res = await fetch(`${API_URL}/bookmarks/${type}`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        type,
        target_id,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}
export async function getBookmarkList(
  type: 'product' | 'user' | 'post',
): ApiResPromise<Bookmark> {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyasOuvvOyehCIsImVtYWlsIjoid29vbWluMDEzQGdtYWlsLmNvbSIsImltYWdlIjoiZmlsZXMvZmViYzEzLWZpbmFsMDEtZW1qZi9CWERmTkx0X0kud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzUzMDU3NTE3LCJleHAiOjE3NTMxNDM5MTcsImlzcyI6IkZFQkMifQ.8jUASSmXW6Vj_QJSXVMVb3ZZ2tjCtqgiOwgfhh0sGnQ';
  try {
    const body = {
      type,
    };
    console.log(body);
    const res = await fetch(`${API_URL}/bookmarks/${type}`, {
      method: 'GET',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

export async function deleteBookmark(_id: number): ApiResPromise<null> {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuyasOuvvOyehCIsImVtYWlsIjoid29vbWluMDEzQGdtYWlsLmNvbSIsImltYWdlIjoiZmlsZXMvZmViYzEzLWZpbmFsMDEtZW1qZi9CWERmTkx0X0kud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzUzMDU3NTE3LCJleHAiOjE3NTMxNDM5MTcsImlzcyI6IkZFQkMifQ.8jUASSmXW6Vj_QJSXVMVb3ZZ2tjCtqgiOwgfhh0sGnQ';
  try {
    const res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        _id,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }
}

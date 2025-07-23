'use server';

import {
  ApiResPromise,
  Bookmark,
  BookmarkPost,
  GetUserBookmarkResponseDto,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function postBookmark(
  type: 'product' | 'user' | 'post',
  target_id: number,
  accessToken: string,
): ApiResPromise<Bookmark> {
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

export async function deleteBookmark(
  _id: number,
  accessToken: string,
): ApiResPromise<null> {
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

export async function getBookmarkList(
  type: 'product' | 'user' | 'post',
  accessToken: string,
): ApiResPromise<Bookmark> {
  try {
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

export async function getBookmark(
  type: 'product' | 'user' | 'post',
  target_id: number,
  accessToken: string,
): ApiResPromise<Bookmark> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/${type}/${target_id}`, {
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

export async function getBookmarks(
  type: 'product' | 'user' | 'post',
  accessToken: string,
): ApiResPromise<BookmarkPost[]> {
  try {
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

export async function getAllUserBookmark(
  _id: number,
): ApiResPromise<GetUserBookmarkResponseDto> {
  try {
    const res = await fetch(`${API_URL}/users/${_id}/bookmarks`, {
      method: 'GET',
      headers: {
        'Client-Id': CLIENT_ID,
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

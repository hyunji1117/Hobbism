'use server';
import { uploadFile } from '@/data/actions/file';
import { ApiRes, ApiResPromise, User } from '@/types';
// import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function getUserInfo(_id: number): ApiResPromise<User> {
  try {
    const res = await fetch(`${API_URL}/users/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
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

export async function getUserAttribute(_id: number, attribute: string) {
  try {
    const res = await fetch(`${API_URL}/users/${_id}/${attribute}`, {
      headers: {
        'Client-Id': CLIENT_ID,
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

export async function getOtherUserInfo(_id: number): ApiResPromise<User[]> {
  try {
    const res = await fetch(`${API_URL}/users?custom={"_id":{"$ne":${_id}}}`, {
      headers: {
        'Client-Id': CLIENT_ID,
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

export async function updateUserInfo(
  _id: number,
  formData: FormData,
): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    const attach = formData.get('attach') as File;
    const accessToken = formData.get('accessToken');
    const nickname = formData.get('nickname')?.toString();
    const introduction = formData.get('introduction')?.toString();
    const address = formData.get('address')?.toString();
    const detail = formData.get('detail')?.toString();
    const extraRes = await getUserAttribute(_id, 'extra');
    const prevExtra = extraRes.ok ? extraRes.item.extra : {};
    let image;

    console.log(attach);
    console.log(accessToken);
    if (attach instanceof File && attach.size > 0) {
      const fileRes = await uploadFile(formData);
      console.log(`fileRes`, fileRes);
      if (fileRes.ok) {
        image = fileRes.item[0].path;
      } else {
        return fileRes;
      }
    }
    const body = {
      ...(address && { address }),
      extra: {
        ...prevExtra,
        ...(nickname && { nickname }),
        ...(introduction && { introduction }),
        ...(detail && { detail_address: detail }),
      },
      ...(image ? { image } : {}),
    };

    console.log(`body`, body);
    console.log(`accessToken`, accessToken);
    res = await fetch(`${API_URL}/users/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

    console.log('data patch', data);
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message:
        '요청하신 작업 처리에 실패했습니다. 잠시 후 다시 이용해 주시기 바랍니다.',
    };
  }

  if (data.ok) {
    // redirect(`/user/${_id}`);
  }

  return data;
}

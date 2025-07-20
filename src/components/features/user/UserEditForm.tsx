'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '@/data/actions/user';
import { User } from '@/types/';
import { HeaderNav } from '@/components/layout/header/Header';
import { useEffect, useRef, useState } from 'react';
import { converUrlToFile } from '@/utils';
import { BackButton } from '@/components/common/BackButton';

interface Props {
  user: User;
}

export function UserEditForm({ user }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('user', user);
  const [preview, setPreview] = useState(
    user.image || '/images/discord_profile.webp',
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<{
    name: string;
    introduction: string;
    attach: File | null;
    accessToken: string;
  }>({
    defaultValues: {
      name: user.name ?? '',
      introduction: user?.introduction ?? '',
      attach: null,
    },
  });

  const onSubmit = async (data: {
    name: string;
    introduction: string;
    attach: File | null;
    accessToken: string;
  }) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('introduction', data.introduction);
    formData.append('accessToken', data.accessToken);
    if (data.attach) {
      formData.append('attach', data.attach);
    }
    await updateUserInfo(user._id, formData);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('attach', file);
    }
  };

  useEffect(() => {
    const convertImageToFile = async () => {
      if (!user.image) return;

      const file = await converUrlToFile(
        `https://fesp-api.koyeb.app/market/${user.image}`,
      );
      setValue('attach', file);
    };

    convertImageToFile();
  }, [user.image, setValue]);

  useEffect(() => {
    setIsWriting(isDirty);
  }, [isDirty]);

  const [isWriting, setIsWriting] = useState(false);

  return (
    <>
      <HeaderNav>
        <HeaderNav.LeftContent className="flex gap-2">
          <BackButton isWriting={isWriting} needConfirm />
        </HeaderNav.LeftContent>
        <HeaderNav.Title>프로필 수정</HeaderNav.Title>
      </HeaderNav>
      <section className="relative flex flex-1 flex-col justify-center pt-10">
        <div className="relative mx-auto mb-6 flex w-[100px] items-center justify-center">
          <Image
            src={
              preview.startsWith('blob:')
                ? preview
                : `https://fesp-api.koyeb.app/market/${preview}`
            }
            alt="프로필 이미지"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <div
            onClick={handleImageClick}
            className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border bg-white"
          >
            <ImageIcon size={16} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-1 flex-col justify-between gap-5 px-5"
        >
          <input
            type="hidden"
            name="accessToken"
            value={user?.token?.accessToken ?? ''}
          />
          <div className="flex h-full flex-col">
            <section className="flex w-full flex-col gap-2">
              <p>닉네임</p>
              <input
                {...register('name')}
                maxLength={20}
                placeholder="닉네임 (최대 20자)"
                className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
              />
            </section>

            <section className="mt-4 flex w-full flex-col gap-2">
              <p>내 소개</p>
              <textarea
                {...register('introduction')}
                maxLength={200}
                placeholder="내 소개 (최대 200자)"
                className="min-h-52 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
              />
            </section>
          </div>
          <button className="mb-6 w-full rounded-lg bg-[#14243E] py-3 text-sm text-white">
            수정하기
          </button>
        </form>
      </section>
    </>
  );
}

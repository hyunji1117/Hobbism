'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '@/data/actions/user';
import { User } from '@/types/';
import { useEffect, useRef, useState } from 'react';
import { converUrlToFile } from '@/utils';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';
import SuccessModal from '@/components/features/user/edit/SuccessModal';

interface Props {
  user: User;
}

export function UserEditForm({ user }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessToken = useAuthStore(state => state.accessToken);
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);
  const [preview, setPreview] = useState(user.picture);
  const [isWriting, setIsWriting] = useState(false);

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
      introduction: user.extra.introduction ?? '',
      attach: null,
      accessToken: '',
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
    const res = await updateUserInfo(user._id, formData);
    if (res.ok === 1) {
      openModal(({ onClose }) => <SuccessModal onClose={onClose} />);
      setTimeout(() => {
        router.push(`/user/${user._id}`);
      }, 1000);
    }
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
      let preview = '';
      console.log('user image', user.image);
      if (user.image) {
        preview = `https://fesp-api.koyeb.app/market/${user.image}`;
      } else if (user.picture) {
        preview = user.picture;
      } else {
        return;
      }
      setPreview(preview);

      const file = await converUrlToFile(preview);
      setValue('attach', file);
    };

    convertImageToFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.picture, setValue]);

  useEffect(() => {
    setIsWriting(isDirty);
  }, [isDirty]);

  useEffect(() => {
    if (accessToken) {
      setValue('accessToken', accessToken);
    }
  }, [accessToken, setValue]);

  return (
    <>
      <section className="relative flex flex-1 flex-col justify-center pt-10">
        <div className="relative mx-auto mb-6 flex w-[100px] items-center justify-center">
          <Image
            src={preview ? preview : '/images/default-profile-image.webp'}
            alt="프로필 이미지"
            width={100}
            height={100}
            className="size-[100px] rounded-full object-cover"
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
          <input type="hidden" {...register('accessToken')} />
          <div className="flex h-full flex-col">
            <section className="flex w-full flex-col gap-2">
              <div className="flex justify-between">
                <span>닉네임</span>
                <span className="text-sm">
                  한글, 영문, 숫자만 가능(최대 20자)
                </span>
              </div>
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

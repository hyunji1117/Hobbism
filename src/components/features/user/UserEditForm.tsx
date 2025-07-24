'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '@/data/actions/user';
import { User } from '@/types/';
import { useEffect, useRef, useState } from 'react';
import { converUrlToFile, getUserImageUrl } from '@/utils';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modal.store';
import SuccessModal from '@/components/features/user/edit/SuccessModal';

//          interface: 프로필 수정 폼 컴포넌트 Properties          //
interface Props {
  user: User;
}

//          interface: 프로필 수정 폼 입력 타입 정의          //
interface FormValues {
  nickname: string;
  introduction: string;
  attach: File | null;
  accessToken: string;
}

//          component: 프로필 수정 폼 컴포넌트          //
export function UserEditForm({ user }: Props) {
  //          state: 프로필 이미지 업로드 요소 참조 상태          //
  const fileInputRef = useRef<HTMLInputElement>(null); // 프로필 이미지 업로드 input 참조
  //          state: 액세스토큰 상태          //
  const accessToken = useAuthStore(state => state.accessToken); // Zustand에서 accessToken 가져옴
  //          state: 프로필 이미지 미리보기 상태          //
  const [preview, setPreview] = useState<string>(
    '/images/default-profile-image.webp',
  ); // 프로필 이미지 미리보기

  //          state: react-hook-form(닉네임, 소개, 이미지, accessToken)          //
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      nickname: user.extra?.nickname ?? '',
      introduction: user.extra?.introduction ?? '',
      attach: null,
      accessToken: '',
    },
  });

  //          function: 라우터 함수          //
  const router = useRouter(); // 라우터 이동용
  //          function: 오픈 모달 함수          //
  const openModal = useModalStore(state => state.openModal); // 성공 모달 열기용

  //          event handler: 폼 제출 이벤트 처리          //
  const onSubmit = async (data: {
    nickname: string;
    introduction: string;
    attach: File | null;
    accessToken: string;
  }) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
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

  //          event handler: 이미지 박스 선택 이벤트 처리          //
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  //          event handler: 프로필 이미지 변경 이벤트 처리          //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('attach', file);
    }
  };

  //          effect: 이미지 변경 시 실행할 함수          //
  useEffect(() => {
    const convertImageToFile = async () => {
      const preview = getUserImageUrl(user.image);
      if (!preview) return;
      setPreview(preview);
      const file = await converUrlToFile(preview);
      setValue('attach', file);
    };

    convertImageToFile();
  }, [user.image, setValue]);

  //          effect: accessToken 변경 시 실행할 함수          //
  useEffect(() => {
    if (accessToken) {
      setValue('accessToken', accessToken);
    }
  }, [accessToken, setValue]);

  //          render: 프로필 수정 컴포넌트 렌더링          //
  return (
    <section className="relative flex flex-1 flex-col justify-center pt-10">
      {/* 프로필 이미지 영역 */}
      <div className="relative mx-auto mb-6 flex w-[100px] items-center justify-center">
        <Image
          src={preview}
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
        {/* 이미지 변경 버튼 (카메라 아이콘) */}
        <div
          onClick={handleImageClick}
          className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border bg-white"
        >
          <ImageIcon size={16} />
        </div>
      </div>

      {/* 유저 정보 수정 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-1 flex-col justify-between gap-5 px-5"
      >
        <input type="hidden" {...register('accessToken')} />

        <div className="flex h-full flex-col">
          {/* 닉네임 입력 */}
          <section className="flex w-full flex-col gap-2">
            <div className="flex justify-between">
              <span>닉네임</span>
              <span className="text-sm">
                한글, 영문, 숫자만 가능(최대 20자)
              </span>
            </div>
            <input
              {...register('nickname')}
              maxLength={20}
              placeholder="닉네임 (최대 20자)"
              className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
            />
          </section>

          {/* 소개 입력 */}
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

        {/* 제출 버튼 */}
        <button className="mb-6 w-full cursor-pointer rounded-lg bg-[#14243E] py-3 text-sm text-white">
          수정하기
        </button>
      </form>
    </section>
  );
}

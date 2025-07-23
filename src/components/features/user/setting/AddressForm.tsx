'use client';

import { useEffect, useState } from 'react';
import { Address } from 'react-daum-postcode';
import Postcode from 'react-daum-postcode';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Map } from 'lucide-react';
import { getUserAttribute, updateUserInfo } from '@/data/actions/user';
import { useAuthStore } from '@/store/auth.store';
import { useForm } from 'react-hook-form';

interface FormValues {
  address: string;
  detail: string;
}

export default function AddressForm() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useAuthStore(state => state.user);
  const accessToken = useAuthStore(state => state.accessToken);

  const { register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      address: '',
      detail: '',
    },
  });

  const toggleOpen = () => setIsOpen(prev => !prev);

  const onComplete = (data: Address) => {
    setValue('address', data.address);
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchAddress = async () => {
      const addressRes = await getUserAttribute(currentUser._id, 'address');
      const addressDetailRes = await getUserAttribute(
        currentUser._id,
        'extra/detail_address',
      );

      if (addressRes.ok && addressDetailRes.ok) {
        setValue('address', addressRes.item.address);
        setValue('detail', addressDetailRes.item.extra.detail_address);
      }
    };

    fetchAddress();
  }, [currentUser, setValue]);

  const onSubmit = async (data: FormValues) => {
    if (!currentUser) return;

    if (!accessToken) {
      console.error('AccessToken 없음');
      return;
    }

    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('address', data.address);
    formData.append('detail', data.detail);

    const res = await updateUserInfo(currentUser._id, formData);
    if (res.ok) {
      alert('주소가 성공적으로 저장되었습니다.');
    } else {
      console.error(res);
      alert('주소 저장에 실패했습니다.');
    }
  };

  return (
    <>
      <li className="flex items-center gap-2.5 py-4">
        <Map />
        <span className="flex-1">배송지 관리</span>
        <button type="button" onClick={toggleOpen} aria-label="주소 폼 토글">
          {isOpen ? (
            <ChevronUp size={20} className="cursor-pointer" />
          ) : (
            <ChevronDown size={20} className="cursor-pointer" />
          )}
        </button>
      </li>
      {isOpen && (
        <form
          id="address-form"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex flex-col gap-2 px-3"
        >
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">주소</span>
              <Button type="submit" variant="outline">
                저장
              </Button>
            </div>

            <input
              {...register('address')}
              placeholder="주소 입력은 아래 검색 창을 통해 가능합니다"
              className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
              readOnly
            />
          </div>
          <input
            {...register('detail')}
            placeholder="나머지 주소를 입력하세요 (예: 101동 202호)"
            className="h-12 w-full rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
          />

          <div className="mt-3 overflow-hidden rounded-md border">
            <Postcode
              onComplete={onComplete}
              autoClose={false}
              className="h-[400px] w-full"
            />
          </div>
        </form>
      )}
    </>
  );
}

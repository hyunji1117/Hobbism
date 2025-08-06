import Postcode from 'react-daum-postcode';
import { MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/auth.store';
import { Address } from 'react-daum-postcode';
import { updateUserInfo } from '@/data/actions/user';
import toast from 'react-hot-toast';

//          interface: 주소 폼 입력 타입 정의          //
interface FormValues {
  address?: string;
  detail?: string;
  postcode?: string;
}

export function PurchaseAddress({
  userInfo,
  addressInfo,
  localAddressInfo,
  setLocalAddressInfo,
}: {
  userInfo: { name: string; phone: string };
  addressInfo: { address: string; detailAddress: string; postcode: string };
  localAddressInfo: {
    address: string;
    detailAddress: string;
    postcode: string;
  };
  setLocalAddressInfo: React.Dispatch<
    React.SetStateAction<{
      address: string;
      detailAddress: string;
      postcode: string;
    }>
  >;
}) {
  //          state: 주소 입력 폼 오픈 상태          //
  const [isOpen, setIsOpen] = useState(false);

  //          state: 로그인 유저 상태          //
  const currentUser = useAuthStore(state => state.user);
  //          state: accessToken 상태          //
  const accessToken = useAuthStore(state => state.accessToken);

  const { register, setValue, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      address: addressInfo.address ?? '',
      detail: addressInfo.detailAddress ?? '',
      postcode: addressInfo.postcode ?? '',
    },
  });
  // const toggleOpen = () => setIsOpen(prev => !prev);

  const onComplete = (data: Address) => {
    setValue('address', data.address);
    setValue('postcode', data.zonecode);
  };

  const onSubmit = async (data: FormValues) => {
    if (!currentUser) return;

    if (!accessToken) {
      console.error('AccessToken 없음');
      return;
    }

    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('address', data.address ?? '');
    formData.append('postcode', data.postcode ?? '');
    formData.append('detail', data.detail ?? '');
    if (!currentUser?._id) return;
    const res = await updateUserInfo(currentUser._id, formData);
    if (res.ok === 1) {
      toast.success('배송지가 변경되었습니다');
      setLocalAddressInfo({
        address: data.address ?? '',
        detailAddress: data.detail ?? '',
        postcode: data.postcode ?? '',
      });
    } else {
      console.error(res);
    }

    setIsOpen(false);
  };

  // x 버튼 클릭 시 form 닫고 입력값 초기화
  const handleCloseForm = () => {
    reset(); // form input 초기화
    setIsOpen(false); // form 닫기
  };

  return (
    <>
      <div className="mx-3.5">
        <div className="mb-2 flex justify-between border-b border-b-[#EAEAEA] pb-2">
          <h2 className="text-lg font-bold">배송 정보</h2>

          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer text-right font-semibold underline"
            >
              <span>배송지 변경</span>
            </button>
          ) : (
            <button
              onClick={() => handleCloseForm()}
              className="cursor-pointer"
            >
              <X />
            </button>
          )}
        </div>
        {isOpen && (
          <form
            id="address-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 flex flex-col gap-2 px-3 text-[#4a4a4a]"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm">주소</span>
                <div className="flex items-center gap-3">
                  <input
                    {...register('postcode')}
                    className="h-9 w-22 rounded-lg border border-[#e6e6e6] px-4 py-3 text-[#111111] outline-none focus:border-black"
                    placeholder="우편번호"
                    readOnly
                  />
                  <button type="submit" className="cursor-pointer">
                    저장
                  </button>
                </div>
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

        <div className="flex gap-2">
          <MapPin />
          <div className="leading-relaxed">
            <p className="font-semibold">
              {userInfo.name}{' '}
              <span className="font-light text-[#4B5563]">
                {userInfo.phone?.replace(/(\d{3})(\d{4})(\d{4})/, `$1-$2-$3`)}
              </span>
            </p>
            {localAddressInfo.address ? (
              <p className="text-[#4B5563]">
                [{localAddressInfo.postcode}] {localAddressInfo.address}{' '}
                {localAddressInfo.detailAddress &&
                  `(${localAddressInfo.detailAddress})`}
              </p>
            ) : (
              <p className="text-[#4B5563]">배송지가 비어 있습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

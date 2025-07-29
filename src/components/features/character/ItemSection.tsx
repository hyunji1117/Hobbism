'use client';

import ItemPurchaseModal from '@/components/features/character/ItemPurchaseModal';
import { ITEM_DATA } from '@/constant/item';
import { updateUserInfo } from '@/data/actions/user';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useItemStore } from '@/store/item.store';
import { useModalStore } from '@/store/modal.store';
import { Code, Item, User } from '@/types';
import { ChevronUp, Lock } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  extra: Pick<User, 'extra'>;
}
export default function ItemSection({ extra }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { equippedItems, setEquippedItems, ownedItems } = useItemStore();
  const { accessToken, user } = useAuthStore();

  const hobby = extra?.extra?.hobby;
  const items = Object.values(ITEM_DATA).filter(item => item.hobby === hobby);
  //          function: 오픈 모달 함수          //
  const openModal = useModalStore(state => state.openModal);

  const handleItemClick = async (code: Code) => {
    if (!accessToken || !user?._id) return null;

    // 새로 반영된 아이템 목록
    const updated = equippedItems.includes(code)
      ? equippedItems.filter(c => c !== code)
      : [...equippedItems, code];

    console.log('update', updated);
    setEquippedItems(updated);

    // 서버에 PATCH 요청
    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('equippedItemCodes', JSON.stringify(updated));

    const res = await updateUserInfo(user._id, formData);
    if (res.ok === 1) {
      console.log('수정됨');
    }
  };

  const purchaseItem = (item: Item) => {
    openModal(({ onClose }) => (
      <ItemPurchaseModal onClose={onClose} item={item} />
    ));
  };

  useEffect(() => {
    if (!hobby) return;

    const validCodes = Object.values(ITEM_DATA)
      .filter(item => item.hobby === hobby)
      .map(item => item.code);

    console.log('validCodes', validCodes);

    // 유효한 아이템만 남기고 상태 업데이트
    useItemStore
      .getState()
      .updateEquippedItems(prev =>
        prev.filter(code => validCodes.includes(code)),
      );
  }, [hobby]);

  return (
    <div
      className={cn(
        'scrollbar-hide absolute bottom-0 z-50 m-0 flex w-full flex-col border-t bg-white px-4 pt-8 pb-4 transition-transform duration-500 ease-in-out',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="absolute -top-8 left-0 flex h-8 w-[100px] cursor-pointer items-center justify-center rounded-tr-md border border-b-0 bg-white text-gray-600"
      >
        <ChevronUp className={cn(isOpen && 'rotate-180')} />
      </button>
      <div className="scrollbar-hide grid grid-cols-3 gap-4 overflow-y-scroll p-2">
        {/* TODO: 분리해야함 */}
        {/* 아이템 컴포넌트 */}
        {items.map(item => {
          const isEquipped = equippedItems.includes(item.code);
          const isOwned = ownedItems.includes(item.code);
          return (
            <div
              key={item.code}
              className={cn('flex cursor-pointer flex-col gap-2')}
              onClick={() =>
                isOwned ? handleItemClick(item.code) : purchaseItem(item)
              }
            >
              <div
                className={cn(
                  'relative flex aspect-square items-center justify-center rounded-xl bg-gray-100 py-2.5',
                  isEquipped && 'ring-2 ring-gray-500',
                )}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={cn(
                    'object-contain p-2',
                    !isOwned && 'brightness-[0.5] contrast-0 grayscale',
                  )}
                />
                {!isOwned && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                    <Lock size={32} className="text-white" />
                  </div>
                )}
              </div>
              <p className="text-center text-sm font-semibold text-gray-700 select-none">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

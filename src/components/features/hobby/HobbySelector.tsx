'use client';

import { HOBBY_ITEMS } from '@/constant/hobby';

import { useState } from 'react';
import SaveButton from '@/components/features/hobby/Savebutton';
import HobbyItem from '@/components/features/hobby/HobbyItem';

export default function HobbySelector({
  defaultHobby,
}: {
  defaultHobby: string;
}) {
  const [selected, setSelected] = useState(defaultHobby);

  return (
    <>
      <div className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-y-scroll">
        {HOBBY_ITEMS.map(item => (
          <HobbyItem
            key={item.code}
            {...item}
            selected={item.code === selected}
            onSelect={() => setSelected(item.code)}
          />
        ))}
      </div>
      <SaveButton selected={selected} />
    </>
  );
}

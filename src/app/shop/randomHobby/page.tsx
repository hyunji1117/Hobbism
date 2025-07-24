import { RandomHobbyContent } from '@/components/features/shop/RandomHobby/RandomHobbyContent';
import { Suspense } from 'react';

export default function RandomHobby() {
  return (
    <>
      <Suspense>
        <RandomHobbyContent />
      </Suspense>
    </>
  );
}

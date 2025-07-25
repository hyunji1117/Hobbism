import { RandomHobbyContent } from '@/components/features/shop/RandomHobby/RandomHobbyContent';
import { fetchLiveProducts } from '@/data/functions/AllProductFetch';
import { Suspense } from 'react';

export default async function RandomHobby() {
  const categoryData = await fetchLiveProducts();

  return (
    <>
      <Suspense>
        <RandomHobbyContent categoryData={categoryData} />
      </Suspense>
    </>
  );
}

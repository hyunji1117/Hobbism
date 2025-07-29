import { RandomHobbyContent } from '@/components/features/shop/RandomHobby/RandomHobbyContent';
import { fetchAllProducts } from '@/data/functions/ProductFetch';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '취미 뽑기 페이지',
  description: '취미 뽑기 페이지입니다.',
};

export default async function RandomHobby() {
  const categoryData = await fetchAllProducts();

  return (
    <>
      <Suspense>
        <RandomHobbyContent categoryData={categoryData} />
      </Suspense>
    </>
  );
}

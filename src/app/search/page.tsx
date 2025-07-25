import SearchList from '@/app/search/searchList';
import { fetchLiveProducts } from '@/data/functions/AllProductFetch';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '검색 결과 페이지',
  description: '검색 결과 페이지입니다.',
};

export default async function SearchPage() {
  // const allData = await fetchProducts();
  const initialData = await fetchProducts(1);

  return (
    <Suspense>
      <section className="mx-3.5">
        <SearchList allData={initialData} />
      </section>
    </Suspense>
  );
}

import SearchList from '@/app/search/searchList';
import TopButton from '@/components/common/TopButton';
import { fetchProducts } from '@/data/functions/ProductFetch';
import filterValidProducts from '@/utils/product';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '검색 결과 페이지',
  description: '검색 결과 페이지입니다.',
};

export default async function SearchPage() {
  const initialData = await fetchProducts(1);
  const filtered = filterValidProducts(initialData);

  return (
    <Suspense>
      <section className="mx-3.5">
        <SearchList initialData={filtered} />

        <TopButton />
      </section>
    </Suspense>
  );
}

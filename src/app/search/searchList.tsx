'use client';

import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SearchList({ allData }: { allData: Product[] }) {
  const searchParams = useSearchParams();
  const word = searchParams.get('word');

  /* ======================== 무한 스크롤 ======================== */
  /* ------------ 상태 변수 --------------- */
  const [products, setProducts] = useState<Product[]>(allData ?? []); // 화면에 그려질 게시물 목록
  const [page, setPage] = useState(1); // 현재 불러올 페이지 번호
  const [loading, setLoading] = useState(false); // fetch 진행중 여부
  const [hasNextPage, setHasNextPage] = useState(false); // 다음 페이지가 있는지
  const [pageParams, setPageParams] = useState<number[]>([]); // 이미 가져온 페이지 번호 기록

  /* ------ DOM 참조 -------- */
  const observerRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 트리거 참조

  /* ============ 게시물 로딩 함수 ============ */
  const loadingProducts = async (page: number) => {
    if (pageParams.includes(page)) return; // 이미 요청했던 page라면 중복 호출 차단
    setLoading(true);

    const data = await fetchProducts(page); // 서버에서 (page)번 페이지 게시물 받아옴
    setProducts(prev => {
      const newData = data.filter(d => !prev.some(p => p._id === d._id)); // 중복 제거 로직
      return [...prev, ...newData];
    });

    setPageParams(prev => [...prev, page]); // 요청한 page 번호를 기록 -> 중복 호출 방지
    setHasNextPage(data.length !== 0); // '다음 페이지가 있는가?' 판정: 이번에 가져온 data가 0개면 더 없음

    setLoading(false);
  };

  const searchProducts = products.filter(product =>
    product.name.includes(word ?? ''),
  );

  /* IntersectionObserver로 무한 스크롤 트리거 */
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        // div가 화면에 50% 이상 보이고, 다음 페이지도 있으며, 로딩 중이 아닐 때
        if (entry.isIntersecting && hasNextPage && !loading) {
          const nextPage = page + 1;
          await loadingProducts(nextPage);
          setPage(nextPage); // page 값을 1 증가
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(target);

    return () => observer.disconnect(); // 클린업
  }, [page, hasNextPage, loading]);

  /* ============== page 값이 변할 때마다 fetch =========== */
  useEffect(() => {
    loadingProducts(page); //page가 바뀔 때마다 해당 페이지 게시물 로드
  }, [page]);

  console.log('searchProducts', searchProducts);
  return (
    <section className="mx-3.5">
      <h2>
        <b>{word} </b>검색 결과
      </h2>

      <div className="grid grid-cols-2 gap-2.5">
        {searchProducts.map(product => (
          <div key={product._id}>
            <ShopProduct
              _id={product._id}
              price={product.price}
              name={product.name}
              mainImageSrc={product.mainImages[0]?.path}
              category={product.extra.category}
              discountRate={product.extra.discountRate}
              discountPrice={product.extra.discountedPrice}
              recommendedBy={product.extra.recommendedBy}
              textPrice="text-sm"
              liveTitle={product.extra?.live?.title}
              liveRate={product.extra?.live?.liveDiscountRate}
              livePrice={product.extra?.live?.livePrice}
            />
          </div>
        ))}
      </div>

      <div ref={observerRef} className="h-10" />
      {loading && <div className="py-4 text-center">불러오는 중...</div>}
      {!hasNextPage && !loading && (
        <p className="py-4 text-center text-gray-500">더 이상 상품이 없어요</p>
      )}
    </section>
  );
}

'use client';

import { SmallLoading } from '@/components/common/SmallLoading';
import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { Product } from '@/types';
import filterValidProducts from '@/utils/product';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function SearchList({
  initialData,
}: {
  initialData: Product[];
}) {
  const searchParams = useSearchParams();
  const word = searchParams.get('word') ?? '';

  /* ======================== 무한 스크롤 ======================== */
  //          state: 무한 스크롤 상태            //
  const [products, setProducts] = useState<Product[]>(initialData ?? []); // 화면에 그려질 게시물 목록
  const [page, setPage] = useState(2); // 현재 불러올 페이지 번호
  const [loading, setLoading] = useState(false); // fetch 진행중 여부
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지가 있는지
  const observerRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 트리거 참조

  //          function: 게시물 로딩 함수          //
  const loadingProducts = useCallback(async () => {
    if (loading || !hasNextPage) return; // 이미 요청했던 page라면 중복 호출 차단
    setLoading(true);

    const data = await fetchProducts(page);
    const filtered = filterValidProducts(data);

    // 서버에서 (page)번 페이지 게시물 받아옴
    if (filtered.length === 0) {
      setHasNextPage(false);
    } else {
      setProducts(prev => [...prev, ...filtered]);
      setPage(prev => prev + 1);
    }

    setLoading(false);
  }, [hasNextPage, loading, page]);

  //          function: word(searchParams) 포함된 상품           //
  const searchProducts = products.filter(product =>
    product.name.includes(word),
  );

  //        effect: IntersectionObserver로 무한스크롤 트리거       //
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasNextPage) {
          loadingProducts();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, loading, loadingProducts]);

  //         render: 검색 결과 렌더링          //
  return (
    <section className="mx-3.5">
      <h2 className="my-2">
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
              recommendedBy={product.extra.recommendedBy}
              textPrice="text-sm"
            />
          </div>
        ))}
      </div>

      {/* ========= 상품이 없을 경우 렌더링 ======== */}
      {searchProducts.length === 0 &&
        products.length > 0 &&
        !loading &&
        !hasNextPage && (
          <div className="absolute top-1/2 left-1/2 w-full -translate-1/2">
            <div className="relative left-1/2 aspect-square w-[38%] -translate-x-1/2">
              <Image
                fill
                src={'/images/character/character-sad.webp'}
                alt="Sorry"
                priority={false}
                sizes="(max-width: 768px) 130px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            <p className="my-3 text-center text-sm text-[#4B5563]">
              <span className="font-semibold">{word}</span> 상품이 없습니다.
            </p>
          </div>
        )}

      {/* ===== 무한 스크롤 observer ===== */}
      <div ref={observerRef} className="h-10" />
      {/* ===== loading 중 렌더링 ===== */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 mb-3 -translate-1/2">
          <PulseLoader color="#4A4A4A" />
        </div>
      )}

      {/* ===== 무한 스크롤 끝날 시 렌더 ====== */}
      {searchProducts.length > 0 && !hasNextPage && !loading && (
        <p className="py-4 text-center text-gray-500">
          모든 상품을 다 보셨어요!
        </p>
      )}
    </section>
  );
}

// app/(main)/shop/ShopList.tsx - 클라이언트 컴포넌트
'use client'; // 필수: React Hooks 사용

import { ShopAd } from '@/components/features/shop/ShopAd';
import { ShopCategory } from '@/components/features/shop/ShopCategory';
import { ShopProduct } from '@/components/features/shop/ShopProduct';
import { fetchProducts } from '@/data/functions/ProductFetch';
import { useLiveStore } from '@/store/live.store';
import { Product } from '@/types';
import filterValidProducts from '@/utils/product';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function ShopList({ initialData }: { initialData: Product[] }) {
  //       state: 무한 스크롤 상태 변수          //
  const [products, setProducts] = useState<Product[]>(initialData ?? []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageParams, setPageParams] = useState<number[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  //        function: 게시물 로딩 함수          //
  const loadingProducts = useCallback(
    async (page: number) => {
      if (pageParams.includes(page)) return;
      setLoading(true);

      const data = await fetchProducts(page);
      const filteredData = filterValidProducts(data);

      setProducts(prev => {
        const newData = filteredData.filter(
          d => !prev.some(p => p._id === d._id),
        );
        return [...prev, ...newData];
      });

      setPageParams(prev => [...prev, page]);
      setHasNextPage(data.length !== 0);

      setLoading(false);
    },
    [pageParams],
  );

  //              effect: fetchLive 호출          //
  const fetchLive = useLiveStore(state => state.fetchLive);
  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  const pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  //        effect: IntersectionObserver로 무한 트리거        //
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !loading) {
          const nextPage = pageRef.current + 1;
          await loadingProducts(nextPage);
          setPage(nextPage);
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, loading, loadingProducts]);

  //       state: 선택된 카테고리 상태       //
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProducts =
    selectedCategory === 'ALL'
      ? products
      : products.filter(product =>
          product.extra.category.includes(selectedCategory),
        );

  //        function: 선택된 카테고리의 상품이 나오는 페이지를 찾아서 렌더링      //
  const handleCategoryChange = async (newCategory: string) => {
    setLoading(true);
    setSelectedCategory(newCategory);
    setProducts([]);

    let targetPage = 1;
    let firstPageData: Product[] = [];

    if (newCategory !== 'ALL') {
      while (true) {
        const data = await fetchProducts(targetPage);
        const filteredData = filterValidProducts(data);
        if (filteredData.length === 0) break;

        const filtered = filteredData.filter(p =>
          p.extra.category.includes(newCategory),
        );

        if (filtered.length > 0) {
          firstPageData = filtered;
          break;
        }

        targetPage++;
      }
    } else {
      const data = await fetchProducts(1);
      const filteredData = filterValidProducts(data);
      firstPageData = filteredData;
    }

    // 데이터를 다 받은 후 한 번에 상태 세팅
    setProducts(firstPageData);
    setPage(targetPage);
    setPageParams([targetPage]);
    setHasNextPage(firstPageData.length !== 0);
    setLoading(false);
  };

  //        render: 상품 렌더링        //
  const productsList = filteredProducts.reduce<JSX.Element[]>(
    (acc, product, idx) => {
      // 8개마다 광고 삽입
      if (idx > 0 && idx % 8 === 0) {
        acc.push(<ShopAd key={`ad-${idx}`} />);
      }

      acc.push(
        <ShopProduct
          _id={product._id}
          price={product.price}
          name={product.name}
          mainImageSrc={product.mainImages[0]?.path}
          category={product.extra.category}
          discountRate={product.extra.discountRate}
          recommendedBy={product.extra.recommendedBy}
          key={product._id}
          textPrice="text-base"
        />,
      );

      return acc;
    },
    [],
  );

  //         effect: page 값이 변할 때마다 fetch       //
  useEffect(() => {
    loadingProducts(page);
  }, [page, loadingProducts]);

  //          render: 전체 카테고리 별 상품 렌더링        //
  return (
    <>
      <section className="text-[#4a4a4a]">
        <div className="ml-5">
          <ShopCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </div>

        <div className="mx-5">
          <div className="grid grid-cols-2 gap-2.5">{productsList}</div>
        </div>

        <div ref={observerRef} className="h-5" />
        {/* 상품 리스트 하단 로딩 */}
        {loading && (
          <div className="fixed bottom-15 left-1/2 z-10 max-w-[600px] -translate-x-1/2">
            <ClipLoader
              color="#4A4A4A"
              size={20}
              cssOverride={{ borderWidth: '3px' }}
            />
          </div>
        )}
        {!hasNextPage && !loading && (
          <p className="pb-4 text-center text-gray-500">
            모든 상품을 다 보셨어요!
          </p>
        )}
      </section>
    </>
  );
}

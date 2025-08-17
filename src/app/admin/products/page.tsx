'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'soldout';
  createdAt: string;
}

const ProductManagementPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 더미 데이터
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'LEGO Creator Expert 10242 MINI Cooper',
      code: 'LEG-10242',
      brand: 'LEGO',
      category: 'building',
      price: 98000,
      stock: 15,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Tamiya 1/24 스포츠카 시리즈',
      code: 'TAM-24001',
      brand: 'Tamiya',
      category: 'model',
      price: 35000,
      stock: 0,
      status: 'soldout',
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      name: 'Fender Player Stratocaster',
      code: 'FEN-STR-001',
      brand: 'Fender',
      category: 'music',
      price: 890000,
      stock: 3,
      status: 'active',
      createdAt: '2024-01-08',
    },
  ]);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'building', label: '조립/블록' },
    { value: 'model', label: '모델링' },
    { value: 'music', label: '음악' },
    { value: 'art', label: '미술/공예' },
    { value: 'collection', label: '수집' },
    { value: 'tech', label: '테크/전자' },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      soldout: 'bg-red-100 text-red-800',
    };

    const labels = {
      active: '판매중',
      inactive: '판매중지',
      soldout: '품절',
    };

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${badges[status as keyof typeof badges]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더*/}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="px-4 py-4 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                관리자 홈
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
                상품 관리
              </h1>
            </div>
            <Link href="/admin/products/new">
              <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 lg:px-6 lg:py-3">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                새 상품 등록
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* 탭 메뉴*/}
          <div className="mb-6 lg:mb-8">
            <div className="rounded-t-xl border-b border-gray-200 bg-white">
              <nav className="-mb-px flex space-x-8 px-6 lg:px-8">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors lg:text-base ${
                    activeTab === 'list'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  상품 목록
                </button>
                <Link href="/admin/brands">
                  <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 lg:text-base">
                    브랜드 관리
                  </button>
                </Link>
              </nav>
            </div>
          </div>

          {/* 검색 및 필터*/}
          <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:mb-8 lg:p-8">
            <div className="flex flex-col space-y-4 xl:flex-row xl:items-center xl:justify-between xl:space-y-0">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="상품명, 상품코드, 브랜드로 검색..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 lg:w-96"
                  />
                  <svg
                    className="absolute top-3.5 left-3 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2 lg:space-x-4">
                  <button className="flex items-center rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-50">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                      />
                    </svg>
                    <span className="hidden lg:inline">필터</span>
                  </button>
                  <button className="flex items-center rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-50">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="hidden lg:inline">내보내기</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4 lg:justify-end">
                <div className="flex items-center space-x-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>총 {filteredProducts.length}개 상품</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">보기:</span>
                  <select className="rounded-lg border border-gray-300 px-2 py-1 text-sm">
                    <option>10개씩</option>
                    <option>25개씩</option>
                    <option>50개씩</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 상품 목록 테이블*/}
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  상품 목록
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    선택 삭제
                  </button>
                  <button className="rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    일괄 수정
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      상품정보
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      브랜드
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      카테고리
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      가격
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      재고
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      등록일
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredProducts.map(product => (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-4 h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200">
                            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600">
                              <span className="text-xs font-bold text-white">
                                IMG
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.brand}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                          {
                            categories.find(
                              cat => cat.value === product.category,
                            )?.label
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ₩{product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}
                          >
                            {product.stock}개
                          </span>
                          {product.stock <= 5 && product.stock > 0 && (
                            <svg
                              className="ml-1 h-4 w-4 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {product.createdAt}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <button className="font-medium text-indigo-600 hover:text-indigo-900">
                              수정
                            </button>
                          </Link>
                          <button className="font-medium text-red-600 hover:text-red-900">
                            삭제
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  검색 결과가 없습니다
                </h3>
                <p className="mb-6 text-gray-500">
                  다른 검색어로 시도하거나 새 상품을 등록해보세요.
                </p>
                <Link href="/admin/products/new">
                  <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
                    새 상품 등록하기
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* 페이지네이션*/}
          {filteredProducts.length > 0 && (
            <div className="mt-6 flex items-center justify-between rounded-b-xl border-t border-gray-200 bg-white px-6 py-4">
              <div className="flex flex-1 items-center justify-between">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    총{' '}
                    <span className="font-medium">
                      {filteredProducts.length}
                    </span>
                    개 중 <span className="font-medium">1</span>-
                    <span className="font-medium">
                      {Math.min(10, filteredProducts.length)}
                    </span>
                    개 표시
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                    이전
                  </button>
                  <div className="hidden items-center space-x-1 md:flex">
                    <button className="relative inline-flex items-center rounded-lg border border-gray-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                      1
                    </button>
                    <button className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                  </div>
                  <button className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    다음
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;

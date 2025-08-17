'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Brand {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  country: string;
  category: string;
  establishedYear: string;
  status: 'active' | 'inactive';
  productsCount: number;
  createdAt: string;
  // 회사 정보
  companyInfo: {
    ceoName: string;
    businessAddress: string;
    businessNumber: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
  };
}

const BrandManagementPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 더미 데이터
  const [brands] = useState<Brand[]>([
    {
      id: '1',
      name: '레고',
      nameEn: 'LEGO',
      code: 'LEG',
      country: '덴마크',
      category: 'building',
      establishedYear: '1958',
      status: 'active',
      productsCount: 234,
      createdAt: '2024-01-15',
      companyInfo: {
        ceoName: 'Niels B. Christiansen',
        businessAddress: 'Aastvej 1, 7190 Billund, Denmark',
        businessNumber: 'DK-12345678',
        contactEmail: 'contact@lego.com',
        contactPhone: '+45-7950-6070',
        website: 'https://www.lego.com',
      },
    },
    {
      id: '2',
      name: '타미야',
      nameEn: 'Tamiya',
      code: 'TAM',
      country: '일본',
      category: 'model',
      establishedYear: '1946',
      status: 'active',
      productsCount: 156,
      createdAt: '2024-01-10',
      companyInfo: {
        ceoName: 'Shunsaku Tamiya',
        businessAddress: '3-7 Ondawara, Suruga-ku, Shizuoka City, Japan',
        businessNumber: 'JP-87654321',
        contactEmail: 'info@tamiya.com',
        contactPhone: '+81-54-238-2012',
        website: 'https://www.tamiya.com',
      },
    },
    {
      id: '3',
      name: '펜더',
      nameEn: 'Fender',
      code: 'FEN',
      country: '미국',
      category: 'music',
      establishedYear: '1946',
      status: 'active',
      productsCount: 89,
      createdAt: '2024-01-08',
      companyInfo: {
        ceoName: 'Andy Mooney',
        businessAddress: '17600 N Perimeter Dr, Scottsdale, AZ 85255, USA',
        businessNumber: 'US-11223344',
        contactEmail: 'info@fender.com',
        contactPhone: '+1-480-596-9690',
        website: 'https://www.fender.com',
      },
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
    };

    const labels = {
      active: '활성',
      inactive: '비활성',
    };

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${badges[status as keyof typeof badges]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || brand.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 헤더 */}
      <header className="border-b bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                ← 관리자 홈
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">브랜드 관리</h1>
            </div>
            <Link href="/admin/brands/new">
              <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                새 브랜드 등록
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          {/* 탭 메뉴 */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <Link href="/admin/products">
                  <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    상품 목록
                  </button>
                </Link>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`border-b-2 px-1 py-4 text-sm font-medium ${
                    activeTab === 'list'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  브랜드 관리
                </button>
              </nav>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="브랜드명, 영문명, 코드로 검색..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80"
                  />
                  <span className="absolute top-2.5 right-3 text-gray-400">
                    🔍
                  </span>
                </div>

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>총 {filteredBrands.length}개 브랜드</span>
              </div>
            </div>
          </div>

          {/* 브랜드 목록 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                className="rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="p-6">
                  {/* 브랜드 헤더 */}
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-600">{brand.nameEn}</p>
                      <p className="text-xs text-gray-500">
                        코드: {brand.code}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(brand.status)}
                    </div>
                  </div>

                  {/* 브랜드 정보 */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">국가:</span>
                      <span className="text-gray-900">{brand.country}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">설립년도:</span>
                      <span className="text-gray-900">
                        {brand.establishedYear}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">카테고리:</span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        {
                          categories.find(cat => cat.value === brand.category)
                            ?.label
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">등록 상품:</span>
                      <span className="font-medium text-gray-900">
                        {brand.productsCount}개
                      </span>
                    </div>
                  </div>

                  {/* 회사 정보 미리보기 */}
                  <div className="mb-4 border-t pt-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-900">
                      회사 정보
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <span className="font-medium">대표자:</span>{' '}
                        {brand.companyInfo.ceoName}
                      </p>
                      <p>
                        <span className="font-medium">이메일:</span>{' '}
                        {brand.companyInfo.contactEmail}
                      </p>
                      <p>
                        <span className="font-medium">전화:</span>{' '}
                        {brand.companyInfo.contactPhone}
                      </p>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex space-x-2">
                    <Link href={`/admin/brands/${brand.id}`} className="flex-1">
                      <button className="w-full rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 transition-colors hover:bg-blue-100">
                        상세보기
                      </button>
                    </Link>
                    <Link
                      href={`/admin/brands/${brand.id}/edit`}
                      className="flex-1"
                    >
                      <button className="w-full rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100">
                        수정
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="rounded-lg bg-white py-12 text-center shadow">
              <p className="mb-4 text-lg text-gray-500">
                검색 결과가 없습니다.
              </p>
              <Link href="/admin/brands/new">
                <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
                  새 브랜드 등록하기
                </button>
              </Link>
            </div>
          )}

          {/* 통계 요약 */}
          {filteredBrands.length > 0 && (
            <div className="mt-8 rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                브랜드 현황
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {brands.filter(b => b.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">활성 브랜드</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {brands.reduce((sum, b) => sum + b.productsCount, 0)}
                  </div>
                  <div className="text-sm text-gray-600">총 상품수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(brands.map(b => b.country)).size}
                  </div>
                  <div className="text-sm text-gray-600">등록 국가</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      brands.reduce((sum, b) => sum + b.productsCount, 0) /
                        brands.length,
                    )}
                  </div>
                  <div className="text-sm text-gray-600">평균 상품수</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandManagementPage;

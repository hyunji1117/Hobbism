'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductForm {
  // 기본 정보
  name: string;
  code: string;
  brandId: string;
  category: string;
  subCategory: string;

  // 가격 및 재고
  originalPrice: string;
  salePrice: string;
  discountRate: string;
  stock: string;
  minStock: string;

  // 상품 설명
  shortDescription: string;
  detailDescription: string;
  specifications: string;

  // 이미지
  mainImage: File | null;
  subImages: File[];

  // 배송 정보
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shippingFee: string;
  freeShippingThreshold: string;

  // 판매 설정
  status: 'active' | 'inactive';
  displayOrder: string;
  isRecommended: boolean;
  isNew: boolean;

  // SEO
  metaTitle: string;
  metaDescription: string;
  tags: string[];

  // 추가 정보
  manufacturerCountry: string;
  modelNumber: string;
  releaseDate: string;
  ageRecommendation: string;
  difficulty: string;
}

const ProductRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    code: '',
    brandId: '',
    category: '',
    subCategory: '',
    originalPrice: '',
    salePrice: '',
    discountRate: '',
    stock: '',
    minStock: '',
    shortDescription: '',
    detailDescription: '',
    specifications: '',
    mainImage: null,
    subImages: [],
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
    },
    shippingFee: '',
    freeShippingThreshold: '',
    status: 'active',
    displayOrder: '',
    isRecommended: false,
    isNew: false,
    metaTitle: '',
    metaDescription: '',
    tags: [],
    manufacturerCountry: '',
    modelNumber: '',
    releaseDate: '',
    ageRecommendation: '',
    difficulty: '',
  });

  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    { value: '', label: '카테고리 선택' },
    { value: 'building', label: '조립/블록' },
    { value: 'model', label: '모델링' },
    { value: 'music', label: '음악' },
    { value: 'art', label: '미술/공예' },
    { value: 'collection', label: '수집' },
    { value: 'tech', label: '테크/전자' },
    { value: 'sports', label: '스포츠' },
    { value: 'game', label: '게임' },
  ];

  const subCategories: { [key: string]: string[] } = {
    building: ['레고', '건담', '플라모델', '목재조립', '금속조립'],
    model: ['비행기', '자동차', '배', '피규어', '디오라마'],
    music: ['기타', '피아노', '드럼', '관악기', '현악기'],
    art: ['수채화', '유화', '조각', '도예', '캘리그래피'],
    collection: ['코인', '우표', '카드', '피규어', '빈티지'],
    tech: ['로봇', '드론', 'RC카', '전자키트', '3D프린터'],
    sports: ['축구', '야구', '농구', '테니스', '골프'],
    game: ['보드게임', '퍼즐', '체스', '카드게임', 'RPG'],
  };

  const brands = [
    { value: '', label: '브랜드 선택' },
    { value: 'lego', label: 'LEGO' },
    { value: 'tamiya', label: 'Tamiya' },
    { value: 'fender', label: 'Fender' },
    { value: 'gibson', label: 'Gibson' },
    { value: 'bandai', label: 'Bandai' },
    { value: 'kotobukiya', label: 'Kotobukiya' },
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDimensionChange = (
    dimension: keyof ProductForm['dimensions'],
    value: string,
  ) => {
    setFormData(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'sub',
  ) => {
    const files = Array.from(event.target.files || []);

    if (type === 'main' && files.length > 0) {
      setFormData(prev => ({ ...prev, mainImage: files[0] }));
    } else if (type === 'sub') {
      setFormData(prev => ({
        ...prev,
        subImages: [...prev.subImages, ...files],
      }));
    }
  };

  const removeSubImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subImages: prev.subImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 여기에 실제 API 호출 로직 구현
      console.log('상품 등록 데이터:', formData);

      // 임시 딜레이
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('상품이 성공적으로 등록되었습니다!');
      router.push('/admin/products');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 헤더 */}
      <header className="border-b bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/products"
                className="text-blue-600 hover:text-blue-800"
              >
                ← 상품 목록
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">새 상품 등록</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 기본 정보 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                기본 정보
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    상품 코드 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={e => handleInputChange('code', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="예: LEG-10242"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드 *
                  </label>
                  <select
                    required
                    value={formData.brandId}
                    onChange={e => handleInputChange('brandId', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    {brands.map(brand => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    모델 번호
                  </label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={e =>
                      handleInputChange('modelNumber', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="모델 번호"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    카테고리 *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={e =>
                      handleInputChange('category', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    세부 카테고리
                  </label>
                  <select
                    value={formData.subCategory}
                    onChange={e =>
                      handleInputChange('subCategory', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    disabled={!formData.category}
                  >
                    <option value="">세부 카테고리 선택</option>
                    {formData.category &&
                      subCategories[formData.category]?.map(sub => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    제조국가
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturerCountry}
                    onChange={e =>
                      handleInputChange('manufacturerCountry', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 덴마크"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    출시일
                  </label>
                  <input
                    type="date"
                    value={formData.releaseDate}
                    onChange={e =>
                      handleInputChange('releaseDate', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  간단 설명 *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.shortDescription}
                  onChange={e =>
                    handleInputChange('shortDescription', e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="상품의 간단한 설명을 입력하세요 (최대 200자)"
                  maxLength={200}
                />
              </div>
            </div>

            {/* 가격 및 재고 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                가격 및 재고
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    정가 (원) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={e =>
                      handleInputChange('originalPrice', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    판매가 (원) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.salePrice}
                    onChange={e =>
                      handleInputChange('salePrice', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    할인율 (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discountRate}
                    onChange={e =>
                      handleInputChange('discountRate', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    재고 수량 *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={e => handleInputChange('stock', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    최소 재고 수량
                  </label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={e =>
                      handleInputChange('minStock', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* 상품 이미지 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                상품 이미지
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    메인 이미지 *
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'main')}
                      className="hidden"
                      id="mainImage"
                    />
                    <label htmlFor="mainImage" className="cursor-pointer">
                      {formData.mainImage ? (
                        <div className="text-green-600">
                          <span className="mb-2 block text-2xl">✓</span>
                          <p>{formData.mainImage.name}</p>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <span className="mb-2 block text-2xl">📷</span>
                          <p>클릭하여 메인 이미지를 업로드하세요</p>
                          <p className="mt-1 text-xs">권장 크기: 800x800px</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    추가 이미지 (최대 5개)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => handleImageUpload(e, 'sub')}
                      className="hidden"
                      id="subImages"
                    />
                    <label htmlFor="subImages" className="cursor-pointer">
                      <div className="text-gray-500">
                        <span className="mb-2 block text-2xl">🖼️</span>
                        <p>클릭하여 추가 이미지를 업로드하세요</p>
                        <p className="mt-1 text-xs">권장 크기: 800x800px</p>
                      </div>
                    </label>
                  </div>

                  {formData.subImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5">
                      {formData.subImages.map((file, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg border p-2"
                        >
                          <p className="truncate text-xs">{file.name}</p>
                          <button
                            type="button"
                            onClick={() => removeSubImage(index)}
                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 상세 설명 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                상세 정보
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    상세 설명
                  </label>
                  <textarea
                    rows={8}
                    value={formData.detailDescription}
                    onChange={e =>
                      handleInputChange('detailDescription', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="상품의 상세한 설명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    제품 사양
                  </label>
                  <textarea
                    rows={6}
                    value={formData.specifications}
                    onChange={e =>
                      handleInputChange('specifications', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="제품 사양을 입력하세요 (크기, 무게, 재질 등)"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      권장 연령
                    </label>
                    <input
                      type="text"
                      value={formData.ageRecommendation}
                      onChange={e =>
                        handleInputChange('ageRecommendation', e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="예: 8세 이상"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      난이도
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={e =>
                        handleInputChange('difficulty', e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">난이도 선택</option>
                      <option value="beginner">초급</option>
                      <option value="intermediate">중급</option>
                      <option value="advanced">고급</option>
                      <option value="expert">전문가</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 배송 정보 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                배송 정보
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    무게 (g)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={e => handleInputChange('weight', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    배송비 (원)
                  </label>
                  <input
                    type="number"
                    value={formData.shippingFee}
                    onChange={e =>
                      handleInputChange('shippingFee', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    상품 크기 (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        type="number"
                        value={formData.dimensions.length}
                        onChange={e =>
                          handleDimensionChange('length', e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="길이"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.dimensions.width}
                        onChange={e =>
                          handleDimensionChange('width', e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="너비"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.dimensions.height}
                        onChange={e =>
                          handleDimensionChange('height', e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="높이"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    무료배송 기준 금액 (원)
                  </label>
                  <input
                    type="number"
                    value={formData.freeShippingThreshold}
                    onChange={e =>
                      handleInputChange('freeShippingThreshold', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>

            {/* 판매 설정 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                판매 설정
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    판매 상태
                  </label>
                  <select
                    value={formData.status}
                    onChange={e =>
                      handleInputChange(
                        'status',
                        e.target.value as 'active' | 'inactive',
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">판매중</option>
                    <option value="inactive">판매중지</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    진열 순서
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={e =>
                      handleInputChange('displayOrder', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                    min="1"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex space-x-8">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isRecommended}
                        onChange={e =>
                          handleInputChange('isRecommended', e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        추천 상품
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={e =>
                          handleInputChange('isNew', e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">신상품</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO 설정 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                SEO 설정
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    메타 제목
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={e =>
                      handleInputChange('metaTitle', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="검색엔진에 노출될 제목"
                    maxLength={60}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    권장 길이: 60자 이내
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    메타 설명
                  </label>
                  <textarea
                    rows={3}
                    value={formData.metaDescription}
                    onChange={e =>
                      handleInputChange('metaDescription', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="검색엔진에 노출될 설명"
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    권장 길이: 160자 이내
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    검색 태그
                  </label>
                  <div className="mb-2 flex space-x-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={e => setCurrentTag(e.target.value)}
                      onKeyPress={e =>
                        e.key === 'Enter' && (e.preventDefault(), addTag())
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="태그를 입력하고 Enter를 누르세요"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/products">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? '등록 중...' : '상품 등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;

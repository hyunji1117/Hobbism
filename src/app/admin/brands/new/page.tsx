'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BrandForm {
  // 브랜드 기본 정보
  name: string;
  nameEn: string;
  code: string;
  category: string;
  country: string;
  establishedYear: string;
  description: string;

  // 회사 정보
  companyInfo: {
    ceoName: string;
    businessAddress: string;
    businessNumber: string;
    contactEmail: string;
    contactPhone: string;
    faxNumber: string;
    website: string;
    employeeCount: string;
    annualRevenue: string;
  };

  // 브랜드 이미지
  logo: File | null;
  brandImages: File[];

  // 추가 정보
  certifications: string[];
  awards: string[];
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };

  // 사업 정보
  businessAreas: string[];
  targetMarket: string[];
  distributionChannels: string[];

  // 상태
  status: 'active' | 'inactive';

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

const BrandRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<BrandForm>({
    name: '',
    nameEn: '',
    code: '',
    category: '',
    country: '',
    establishedYear: '',
    description: '',
    companyInfo: {
      ceoName: '',
      businessAddress: '',
      businessNumber: '',
      contactEmail: '',
      contactPhone: '',
      faxNumber: '',
      website: '',
      employeeCount: '',
      annualRevenue: '',
    },
    logo: null,
    brandImages: [],
    certifications: [],
    awards: [],
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: '',
    },
    businessAreas: [],
    targetMarket: [],
    distributionChannels: [],
    status: 'active',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
  });

  const [currentCertification, setCurrentCertification] = useState('');
  const [currentAward, setCurrentAward] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');

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

  const countries = [
    '대한민국',
    '미국',
    '일본',
    '독일',
    '중국',
    '영국',
    '프랑스',
    '이탈리아',
    '스페인',
    '네덜란드',
    '스위스',
    '덴마크',
    '스웨덴',
    '노르웨이',
    '핀란드',
    '오스트리아',
    '벨기에',
    '캐나다',
    '호주',
    '뉴질랜드',
    '기타',
  ];

  const businessAreaOptions = [
    '제조업',
    '유통업',
    '소매업',
    '온라인판매',
    '수입/수출',
    '디자인',
    '연구개발',
    '교육',
    '컨설팅',
  ];

  const targetMarketOptions = [
    '어린이',
    '청소년',
    '성인',
    '시니어',
    '전문가',
    '초보자',
    '수집가',
    '교육기관',
    '기업',
  ];

  const distributionChannelOptions = [
    '직영점',
    '대리점',
    '온라인몰',
    '백화점',
    '할인점',
    '전문매장',
    '해외수출',
    '도매',
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof BrandForm], [child]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addToArray = (
    field: keyof BrandForm,
    value: string,
    currentValue: string,
    setter: (value: string) => void,
  ) => {
    if (currentValue.trim() && !formData[field].includes(currentValue.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), currentValue.trim()],
      }));
      setter('');
    }
  };

  const removeFromArray = (field: keyof BrandForm, valueToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(item => item !== valueToRemove),
    }));
  };

  const handleCheckboxChange = (
    field: keyof BrandForm,
    value: string,
    checked: boolean,
  ) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, value],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: currentArray.filter(item => item !== value),
      }));
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'brand',
  ) => {
    const files = Array.from(event.target.files || []);

    if (type === 'logo' && files.length > 0) {
      setFormData(prev => ({ ...prev, logo: files[0] }));
    } else if (type === 'brand') {
      setFormData(prev => ({
        ...prev,
        brandImages: [...prev.brandImages, ...files],
      }));
    }
  };

  const removeBrandImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      brandImages: prev.brandImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 여기에 실제 API 호출 로직 구현
      console.log('브랜드 등록 데이터:', formData);

      // 임시 딜레이
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('브랜드가 성공적으로 등록되었습니다!');
      router.push('/admin/brands');
    } catch (error) {
      console.error('브랜드 등록 실패:', error);
      alert('브랜드 등록에 실패했습니다. 다시 시도해주세요.');
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
                href="/admin/brands"
                className="text-blue-600 hover:text-blue-800"
              >
                ← 브랜드 목록
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                새 브랜드 등록
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 브랜드 기본 정보 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                브랜드 기본 정보
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드명 (한글) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="레고"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드명 (영문) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={e => handleInputChange('nameEn', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="LEGO"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드 코드 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={e => handleInputChange('code', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="LEG"
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
                    원산지 국가 *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={e => handleInputChange('country', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">국가 선택</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    설립년도 *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.establishedYear}
                    onChange={e =>
                      handleInputChange('establishedYear', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="1958"
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  브랜드 설명 *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={e =>
                    handleInputChange('description', e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="브랜드의 히스토리, 철학, 특징 등을 설명해주세요"
                />
              </div>
            </div>

            {/* 회사 정보 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                회사 정보
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    대표자명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyInfo.ceoName}
                    onChange={e =>
                      handleInputChange('companyInfo.ceoName', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    사업자등록번호 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyInfo.businessNumber}
                    onChange={e =>
                      handleInputChange(
                        'companyInfo.businessNumber',
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="123-45-67890"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    연락처 이메일 *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.companyInfo.contactEmail}
                    onChange={e =>
                      handleInputChange(
                        'companyInfo.contactEmail',
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="contact@company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    연락처 전화번호 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.companyInfo.contactPhone}
                    onChange={e =>
                      handleInputChange(
                        'companyInfo.contactPhone',
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="02-1234-5678"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    팩스번호
                  </label>
                  <input
                    type="tel"
                    value={formData.companyInfo.faxNumber}
                    onChange={e =>
                      handleInputChange('companyInfo.faxNumber', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="02-1234-5679"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    공식 웹사이트
                  </label>
                  <input
                    type="url"
                    value={formData.companyInfo.website}
                    onChange={e =>
                      handleInputChange('companyInfo.website', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    직원 수
                  </label>
                  <select
                    value={formData.companyInfo.employeeCount}
                    onChange={e =>
                      handleInputChange(
                        'companyInfo.employeeCount',
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">직원 규모 선택</option>
                    <option value="1-10">1-10명</option>
                    <option value="11-50">11-50명</option>
                    <option value="51-200">51-200명</option>
                    <option value="201-500">201-500명</option>
                    <option value="501-1000">501-1000명</option>
                    <option value="1000+">1000명 이상</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    연매출
                  </label>
                  <select
                    value={formData.companyInfo.annualRevenue}
                    onChange={e =>
                      handleInputChange(
                        'companyInfo.annualRevenue',
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">매출 규모 선택</option>
                    <option value="under-1b">10억 미만</option>
                    <option value="1b-10b">10억-100억</option>
                    <option value="10b-100b">100억-1000억</option>
                    <option value="100b-1t">1000억-1조</option>
                    <option value="over-1t">1조 이상</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  사업장 주소 *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.companyInfo.businessAddress}
                  onChange={e =>
                    handleInputChange(
                      'companyInfo.businessAddress',
                      e.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="서울특별시 강남구 테헤란로 123, 456호"
                />
              </div>
            </div>

            {/* 브랜드 이미지 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                브랜드 이미지
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드 로고 *
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'logo')}
                      className="hidden"
                      id="brandLogo"
                    />
                    <label htmlFor="brandLogo" className="cursor-pointer">
                      {formData.logo ? (
                        <div className="text-green-600">
                          <span className="mb-2 block text-2xl">✓</span>
                          <p>{formData.logo.name}</p>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <span className="mb-2 block text-2xl">🏷️</span>
                          <p>클릭하여 브랜드 로고를 업로드하세요</p>
                          <p className="mt-1 text-xs">
                            권장 크기: 400x400px, PNG 투명배경
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    브랜드 이미지 (최대 5개)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => handleImageUpload(e, 'brand')}
                      className="hidden"
                      id="brandImages"
                    />
                    <label htmlFor="brandImages" className="cursor-pointer">
                      <div className="text-gray-500">
                        <span className="mb-2 block text-2xl">🖼️</span>
                        <p>클릭하여 브랜드 이미지를 업로드하세요</p>
                        <p className="mt-1 text-xs">
                          브랜드 스토리, 제품 사진, 회사 이미지 등
                        </p>
                      </div>
                    </label>
                  </div>

                  {formData.brandImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5">
                      {formData.brandImages.map((file, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg border p-2"
                        >
                          <p className="truncate text-xs">{file.name}</p>
                          <button
                            type="button"
                            onClick={() => removeBrandImage(index)}
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

            {/* 사업 영역 및 타겟 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                사업 영역 및 타겟
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    주요 사업 영역 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {businessAreaOptions.map(area => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.businessAreas.includes(area)}
                          onChange={e =>
                            handleCheckboxChange(
                              'businessAreas',
                              area,
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {area}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    주요 타겟 고객 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {targetMarketOptions.map(target => (
                      <label key={target} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.targetMarket.includes(target)}
                          onChange={e =>
                            handleCheckboxChange(
                              'targetMarket',
                              target,
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {target}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    유통 채널 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {distributionChannelOptions.map(channel => (
                      <label key={channel} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.distributionChannels.includes(
                            channel,
                          )}
                          onChange={e =>
                            handleCheckboxChange(
                              'distributionChannels',
                              channel,
                              e.target.checked,
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {channel}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 소셜미디어 및 온라인 정보 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                소셜미디어 & 온라인
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.facebook}
                    onChange={e =>
                      handleInputChange('socialMedia.facebook', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.facebook.com/brandname"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.instagram}
                    onChange={e =>
                      handleInputChange('socialMedia.instagram', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.instagram.com/brandname"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Twitter/X
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.twitter}
                    onChange={e =>
                      handleInputChange('socialMedia.twitter', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/brandname"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.youtube}
                    onChange={e =>
                      handleInputChange('socialMedia.youtube', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.youtube.com/c/brandname"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia.linkedin}
                    onChange={e =>
                      handleInputChange('socialMedia.linkedin', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.linkedin.com/company/brandname"
                  />
                </div>
              </div>
            </div>

            {/* 인증 및 수상 내역 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                인증 및 수상 내역
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    보유 인증
                  </label>
                  <div className="mb-3 flex space-x-2">
                    <input
                      type="text"
                      value={currentCertification}
                      onChange={e => setCurrentCertification(e.target.value)}
                      onKeyPress={e =>
                        e.key === 'Enter' &&
                        (e.preventDefault(),
                        addToArray(
                          'certifications',
                          currentCertification,
                          currentCertification,
                          setCurrentCertification,
                        ))
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="ISO 9001, CE 인증 등"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addToArray(
                          'certifications',
                          currentCertification,
                          currentCertification,
                          setCurrentCertification,
                        )
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>

                  {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromArray('certifications', cert)
                            }
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    주요 수상 내역
                  </label>
                  <div className="mb-3 flex space-x-2">
                    <input
                      type="text"
                      value={currentAward}
                      onChange={e => setCurrentAward(e.target.value)}
                      onKeyPress={e =>
                        e.key === 'Enter' &&
                        (e.preventDefault(),
                        addToArray(
                          'awards',
                          currentAward,
                          currentAward,
                          setCurrentAward,
                        ))
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="굿디자인상, 레드닷 어워드 등"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addToArray(
                          'awards',
                          currentAward,
                          currentAward,
                          setCurrentAward,
                        )
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>

                  {formData.awards.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.awards.map((award, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800"
                        >
                          {award}
                          <button
                            type="button"
                            onClick={() => removeFromArray('awards', award)}
                            className="ml-2 text-yellow-600 hover:text-yellow-800"
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
                    placeholder="검색엔진에 노출될 브랜드 제목"
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
                    placeholder="검색엔진에 노출될 브랜드 설명"
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    권장 길이: 160자 이내
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    검색 키워드
                  </label>
                  <div className="mb-2 flex space-x-2">
                    <input
                      type="text"
                      value={currentKeyword}
                      onChange={e => setCurrentKeyword(e.target.value)}
                      onKeyPress={e =>
                        e.key === 'Enter' &&
                        (e.preventDefault(),
                        addToArray(
                          'keywords',
                          currentKeyword,
                          currentKeyword,
                          setCurrentKeyword,
                        ))
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="키워드를 입력하고 Enter를 누르세요"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addToArray(
                          'keywords',
                          currentKeyword,
                          currentKeyword,
                          setCurrentKeyword,
                        )
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>

                  {formData.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeFromArray('keywords', keyword)}
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

            {/* 브랜드 상태 섹션 */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                브랜드 상태
              </h2>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  활성 상태
                </label>
                <select
                  value={formData.status}
                  onChange={e =>
                    handleInputChange(
                      'status',
                      e.target.value as 'active' | 'inactive',
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-64"
                >
                  <option value="active">활성 (즉시 노출)</option>
                  <option value="inactive">비활성 (노출 안함)</option>
                </select>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/brands">
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
                {isSubmitting ? '등록 중...' : '브랜드 등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandRegistrationForm;

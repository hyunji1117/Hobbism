'use client';

import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  ShoppingCart,
  Package,
  ArrowRight,
  Database,
} from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  description?: string;
  apiEndpoint?: string;
  apiMethod?: string;
}

// 상품 관련 파일 구조만 추출
const productStructure: TreeNode = {
  name: 'Shop & Product System',
  type: 'folder',
  description: '상품 관리 및 쇼핑 시스템',
  children: [
    {
      name: 'Frontend Pages',
      type: 'folder',
      description: '사용자 인터페이스',
      children: [
        {
          name: 'shop',
          type: 'folder',
          children: [
            {
              name: 'page.tsx',
              type: 'file',
              description: '메인 상품 목록 페이지',
              apiEndpoint: 'GET /products',
            },
            {
              name: 'ShopList.tsx',
              type: 'file',
              description: '상품 리스트 컴포넌트',
            },
            {
              name: '[productId]',
              type: 'folder',
              children: [
                {
                  name: 'page.tsx',
                  type: 'file',
                  description: '상품 상세 페이지',
                  apiEndpoint: 'GET /products/{_id}',
                },
              ],
            },
            {
              name: 'cart',
              type: 'folder',
              children: [
                {
                  name: 'page.tsx',
                  type: 'file',
                  description: '장바구니 페이지',
                  apiEndpoint: 'GET /carts',
                },
              ],
            },
            {
              name: 'order',
              type: 'folder',
              children: [
                {
                  name: '[orderId]',
                  type: 'folder',
                  children: [
                    {
                      name: 'page.tsx',
                      type: 'file',
                      description: '주문 상세 페이지',
                      apiEndpoint: 'GET /orders/{_id}',
                    },
                    {
                      name: 'OrderDetailClient.tsx',
                      type: 'file',
                      description: '주문 상세 클라이언트 컴포넌트',
                    },
                  ],
                },
              ],
            },
            {
              name: 'purchase',
              type: 'folder',
              children: [
                {
                  name: 'page.tsx',
                  type: 'file',
                  description: '결제 페이지',
                  apiEndpoint: 'POST /orders',
                },
                {
                  name: 'PurchaseClient.tsx',
                  type: 'file',
                  description: '결제 클라이언트 컴포넌트',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Admin Management',
      type: 'folder',
      description: '관리자 상품 관리',
      children: [
        {
          name: 'products',
          type: 'folder',
          children: [
            {
              name: 'page.tsx',
              type: 'file',
              description: '관리자 상품 목록',
              apiEndpoint: 'GET /products',
            },
            {
              name: 'new',
              type: 'folder',
              children: [
                {
                  name: 'page.tsx',
                  type: 'file',
                  description: '상품 등록 페이지',
                  apiEndpoint: 'POST /products',
                },
              ],
            },
          ],
        },
        {
          name: 'orders',
          type: 'folder',
          children: [
            {
              name: 'page.tsx',
              type: 'file',
              description: '주문 관리',
              apiEndpoint: 'GET /orders',
            },
            {
              name: 'state',
              type: 'folder',
              children: [
                {
                  name: 'page.tsx',
                  type: 'file',
                  description: '주문 상태별 조회',
                  apiEndpoint: 'GET /orders/state',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Components',
      type: 'folder',
      description: '재사용 가능한 컴포넌트',
      children: [
        {
          name: 'shop',
          type: 'folder',
          children: [
            {
              name: 'ProductDetail.tsx',
              type: 'file',
              description: '상품 상세 컴포넌트',
            },
            {
              name: 'ShopCategory.tsx',
              type: 'file',
              description: '상품 카테고리',
            },
            { name: 'ShopProduct.tsx', type: 'file', description: '상품 카드' },
            {
              name: 'RecommendProducts.tsx',
              type: 'file',
              description: '추천 상품',
            },
          ],
        },
        {
          name: 'shopping-cart',
          type: 'folder',
          children: [
            {
              name: 'CartIcon.tsx',
              type: 'file',
              description: '장바구니 아이콘',
            },
            {
              name: 'CartItemCard.tsx',
              type: 'file',
              description: '장바구니 아이템',
            },
            {
              name: 'CartList.tsx',
              type: 'file',
              description: '장바구니 목록',
            },
          ],
        },
        {
          name: 'shopping-order',
          type: 'folder',
          children: [
            {
              name: 'OrderProducts.tsx',
              type: 'file',
              description: '주문 상품 목록',
            },
            {
              name: 'PaymentSelector.tsx',
              type: 'file',
              description: '결제 방법 선택',
            },
            {
              name: 'PaymentSummary.tsx',
              type: 'file',
              description: '결제 요약',
            },
          ],
        },
      ],
    },
    {
      name: 'Data Layer',
      type: 'folder',
      description: '데이터 처리 레이어',
      children: [
        {
          name: 'functions',
          type: 'folder',
          children: [
            {
              name: 'ProductFetch.ts',
              type: 'file',
              description: '상품 데이터 페칭',
              apiEndpoint: 'Server-side fetching',
            },
            {
              name: 'CartFetch.client.ts',
              type: 'file',
              description: '클라이언트 장바구니 처리',
              apiEndpoint: 'Client-side API calls',
            },
            {
              name: 'CartFetch.server.ts',
              type: 'file',
              description: '서버 장바구니 처리',
              apiEndpoint: 'Server-side processing',
            },
            {
              name: 'OrderFetch.ts',
              type: 'file',
              description: '주문 데이터 처리',
              apiEndpoint: 'Order management',
            },
          ],
        },
        {
          name: 'store',
          type: 'folder',
          children: [
            {
              name: 'cartStore.ts',
              type: 'file',
              description: '장바구니 상태 관리',
              apiEndpoint: 'Zustand store',
            },
            {
              name: 'order.store.ts',
              type: 'file',
              description: '주문 상태 관리',
              apiEndpoint: 'Order state',
            },
          ],
        },
        {
          name: 'types',
          type: 'folder',
          children: [
            { name: 'product.ts', type: 'file', description: '상품 타입 정의' },
            {
              name: 'cart.ts',
              type: 'file',
              description: '장바구니 타입 정의',
            },
            { name: 'orders.ts', type: 'file', description: '주문 타입 정의' },
          ],
        },
      ],
    },
  ],
};

// 실제 API 명세를 바탕으로 한 엔드포인트 목록
const apiEndpoints = [
  // 상품 관련 API
  {
    method: 'GET',
    endpoint: '/products',
    description: '상품 목록 조회',
    usage: 'Shop 메인 페이지에서 사용',
    category: '상품',
  },
  {
    method: 'GET',
    endpoint: '/products/{_id}',
    description: '상품 상세 조회',
    usage: '상품 상세 페이지에서 사용',
    category: '상품',
  },

  // 구매 관련 API
  {
    method: 'POST',
    endpoint: '/orders/',
    description: '상품 구매',
    usage: '결제 페이지에서 사용',
    category: '구매',
  },
  {
    method: 'GET',
    endpoint: '/orders/',
    description: '구매 목록 조회',
    usage: '주문 내역 페이지에서 사용',
    category: '구매',
  },
  {
    method: 'GET',
    endpoint: '/orders/state',
    description: '구매 목록의 상태별 조회',
    usage: '관리자 주문 관리에서 사용',
    category: '구매',
  },
  {
    method: 'GET',
    endpoint: '/orders/{_id}',
    description: '구매 상세 조회',
    usage: '주문 상세 페이지에서 사용',
    category: '구매',
  },
  {
    method: 'PATCH',
    endpoint: '/orders/{_id}',
    description: '주문별 주문 상태 수정',
    usage: '관리자 주문 관리에서 사용',
    category: '구매',
  },
  {
    method: 'PATCH',
    endpoint: '/orders/{_id}/products/{product_id}',
    description: '상품별 주문 상태 수정',
    usage: '관리자 주문 관리에서 사용',
    category: '구매',
  },

  // 장바구니 관련 API
  {
    method: 'POST',
    endpoint: '/carts/local',
    description: '장바구니 목록 조회(비로그인)',
    usage: '비회원 장바구니에서 사용',
    category: '장바구니',
  },
  {
    method: 'POST',
    endpoint: '/carts/',
    description: '장바구니에 상품 추가',
    usage: '상품 상세 페이지에서 사용',
    category: '장바구니',
  },
  {
    method: 'GET',
    endpoint: '/carts/',
    description: '장바구니 목록 조회(로그인)',
    usage: '회원 장바구니 페이지에서 사용',
    category: '장바구니',
  },
  {
    method: 'DELETE',
    endpoint: '/carts/',
    description: '장바구니 상품 여러건 삭제',
    usage: '장바구니 전체 삭제에서 사용',
    category: '장바구니',
  },
  {
    method: 'PUT',
    endpoint: '/carts/',
    description: '장바구니 합치기',
    usage: '로그인 시 비회원 장바구니 병합에서 사용',
    category: '장바구니',
  },
  {
    method: 'PATCH',
    endpoint: '/carts/{_id}',
    description: '장바구니 상품 수량 수정',
    usage: '장바구니 수량 변경에서 사용',
    category: '장바구니',
  },
  {
    method: 'DELETE',
    endpoint: '/carts/{_id}',
    description: '장바구니 상품 한건 삭제',
    usage: '장바구니 개별 상품 삭제에서 사용',
    category: '장바구니',
  },
  {
    method: 'DELETE',
    endpoint: '/carts/cleanup',
    description: '장바구니 비우기',
    usage: '장바구니 전체 비우기에서 사용',
    category: '장바구니',
  },
  {
    method: 'PUT',
    endpoint: '/carts/replace',
    description: '장바구니 상품 전체 교체',
    usage: '장바구니 동기화에서 사용',
    category: '장바구니',
  },
];

interface TreeItemProps {
  node: TreeNode;
  depth: number;
}

function TreeItem({ node, depth }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 3);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center rounded-md px-3 py-2 transition-colors hover:bg-blue-50 ${
          node.type === 'folder' ? 'font-medium' : ''
        }`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <span className="mr-2 text-gray-500">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
        {!hasChildren && <span className="mr-2 w-5" />}

        <span className="mr-3 text-gray-600">
          {node.type === 'folder' ? (
            <Folder size={18} className="text-blue-500" />
          ) : (
            <File size={18} className="text-gray-400" />
          )}
        </span>

        <div className="flex-1">
          <div
            className={`text-sm ${node.type === 'folder' ? 'text-blue-700' : 'text-gray-700'}`}
          >
            {node.name}
          </div>
          {node.description && (
            <div className="mt-1 text-xs text-gray-500">{node.description}</div>
          )}
          {node.apiEndpoint && (
            <div className="mt-1 flex items-center text-xs">
              <Database size={12} className="mr-1 text-green-500" />
              <span className="font-mono text-green-600">
                {node.apiEndpoint}
              </span>
            </div>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child, index) => (
            <TreeItem key={index} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductTreePage() {
  const [activeTab, setActiveTab] = useState<'structure' | 'api' | 'flow'>(
    'structure',
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // API 카테고리별 필터링
  const categories = ['전체', '상품', '구매', '장바구니'];
  const filteredEndpoints =
    selectedCategory === '전체'
      ? apiEndpoints
      : apiEndpoints.filter(api => api.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="mb-4 flex items-center gap-3">
            <ShoppingCart className="text-blue-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-900">
              상품 시스템 구조 & API
            </h1>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('structure')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'structure'
                  ? 'border border-blue-200 bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Package className="mr-2 inline h-4 w-4" />
              파일 구조
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'api'
                  ? 'border border-blue-200 bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Database className="mr-2 inline h-4 w-4" />
              API 명세
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'structure' ? (
            <>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  상품 관련 파일 구조
                </h2>
                <p className="text-sm text-gray-600">
                  상품 관리, 쇼핑, 주문 시스템과 관련된 모든 파일들의 구조와
                  역할을 보여줍니다.
                </p>
              </div>

              <div className="max-h-[70vh] overflow-auto rounded-lg bg-gray-50 p-4 font-mono text-sm">
                <TreeItem node={productStructure} depth={0} />
              </div>
            </>
          ) : activeTab === 'api' ? (
            <>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  API 엔드포인트 명세
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  FESP API 서버의 실제 엔드포인트를 기반으로 한 상품 시스템 API
                  명세입니다.
                </p>

                {/* 카테고리 필터 */}
                <div className="mb-4 flex gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedCategory === category
                          ? 'border border-blue-200 bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[70vh] space-y-4 overflow-auto">
                {filteredEndpoints.map((api, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          api.method === 'GET'
                            ? 'bg-green-100 text-green-700'
                            : api.method === 'POST'
                              ? 'bg-blue-100 text-blue-700'
                              : api.method === 'PATCH'
                                ? 'bg-yellow-100 text-yellow-700'
                                : api.method === 'PUT'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {api.method}
                      </span>
                      <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800">
                        {api.endpoint}
                      </code>
                      <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
                        {api.category}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-gray-700">
                      {api.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <ArrowRight size={12} className="mr-1" />
                      <span>{api.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-blue-500" />
              <span>폴더</span>
            </div>
            <div className="flex items-center gap-2">
              <File size={16} className="text-gray-400" />
              <span>파일</span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={16} className="text-green-500" />
              <span>API 엔드포인트</span>
            </div>
            <div className="flex items-center gap-2">
              <Package size={16} className="text-purple-500" />
              <span>컴포넌트</span>
            </div>
          </div>

          {/* API 서버 정보 */}
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Database className="text-blue-600" size={16} />
              <span className="text-sm font-medium text-blue-800">
                API 서버 정보
              </span>
            </div>
            <div className="text-xs text-blue-700">
              <p>
                Base URL:{' '}
                <code className="rounded bg-blue-100 px-2 py-1">
                  https://fesp-api.koyeb.app/market
                </code>
              </p>
              <p className="mt-1">
                Documentation:{' '}
                <code className="rounded bg-blue-100 px-2 py-1">
                  https://fesp-api.koyeb.app/market/apidocs/
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { OrderListFetch } from '@/data/functions/OrderFetch';
import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { OrderInfoRes } from '@/types/orders';

type OrderType = OrderInfoRes['item'];

export function UserShopTab() {
  const { accessToken } = useAuthStore();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (accessToken) {
          const data: OrderInfoRes = await OrderListFetch(accessToken);
          setOrders(Array.isArray(data.item) ? data.item : []);
          setTotalPages(
            Array.isArray(data.item)
              ? Math.ceil(data.item.length / itemsPerPage)
              : 1,
          );
        }
      } catch (error) {
        console.error('주문 목록 가져오기 실패:', error);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const currentOrders = useMemo(() => {
    return orders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [orders, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {currentOrders.length > 0 ? (
          currentOrders.map(order => (
            <li
              key={order._id}
              className="flex items-center gap-5 overflow-x-auto rounded-lg border p-4 sm:gap-4"
            >
              {/* 주문 번호 */}
              <div className="min-w-[70px] text-center">
                <span className="text-xs text-gray-500">주문 번호</span>
                <p className="font-light">
                  OS{order._id.toString().padStart(3, '0')}
                </p>
              </div>

              {/* 주문 일자 */}
              <div className="mr-2 hidden min-w-[130px] text-center sm:block">
                <span className="relative bottom-1 text-xs text-gray-500">
                  주문 일자
                </span>
                <p className="text-xs text-gray-600">{order.createdAt}</p>
              </div>

              {/* 주문 상품 이미지 */}
              <div className="hidden min-w-[64px] justify-center sm:flex">
                <Image
                  src={order.products[0]?.image?.path}
                  alt="주문한 상품이미지"
                  className="h-16 w-16 rounded object-cover"
                  width={40}
                  height={40}
                />
              </div>

              {/* 주문 상품 및 금액 */}
              <div className="min-w-[130px] flex-1">
                <div className="flex items-center">
                  <span className="truncate font-medium">
                    <span className="sm:hidden">
                      {order.products[0]?.name?.length > 13
                        ? `${order.products[0]?.name.slice(0, 13)}...`
                        : order.products[0]?.name}
                    </span>
                    <span className="hidden sm:inline">
                      {order.products[0]?.name?.length > 7
                        ? `${order.products[0]?.name.slice(0, 7)}...`
                        : order.products[0]?.name}
                    </span>
                  </span>
                  {order.products.length > 1 && (
                    <span className="w-12 pl-1 text-xs text-gray-500">
                      외 {order.products.length - 1}개
                    </span>
                  )}
                </div>
                <p className="mt-1 w-[140px] text-sm font-medium">
                  총 결제금액: {order.cost.total.toLocaleString()}원
                </p>
              </div>

              {/* 상세 조회 버튼 */}
              <div className="flex min-w-[60px] justify-end">
                <Link href={`/shop/order/${order._id}`}>
                  <button className="text-xs text-[#999999] underline hover:text-[#888888]">
                    상세 조회
                  </button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <li className="mt-4 text-center text-sm text-gray-400">
            쇼핑 내역이 없습니다.
          </li>
        )}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center space-x-3">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-lg px-3 py-1 ${
              currentPage === 1
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'cursor-pointer border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            이전
          </button>

          {/* 페이지 번호 */}
          <span className="text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-lg px-3 py-1 ${
              currentPage === totalPages
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'cursor-pointer border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

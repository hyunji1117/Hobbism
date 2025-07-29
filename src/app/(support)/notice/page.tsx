'use client';

import { useState } from 'react';
import { Megaphone } from 'lucide-react';

// 더미 공지 데이터
const notices = [
  {
    id: 1,
    title: '[공지사항] - 시스템 오류 안내',
    date: '2025.08.08',
    content: `일부 결제 오류가 발생하여 신속히 복구 중입니다. 불편을 드려 죄송합니다.`,
  },
  {
    id: 2,
    title: '[공지사항] - 서비스 점검',
    date: '2025.08.03',
    content: `더 나은 서비스 제공을 위해 아래 일정에 시스템 점검이 진행됩니다.

    - 점검 일시: 2025년 8월 5일(화) 02:00 ~ 06:00

    점검 시간 동안 일부 서비스 이용이 제한될 수 있습니다.
    이용에 불편을 드려 죄송합니다.`,
  },
  {
    id: 3,
    title: '[공지사항] - 배송 지연',
    date: '2025.08.01',
    content: `최근 주문량 증가 및 택배사 사정으로 인해 일부 지역의 배송이 지연되고 있습니다.
    최대한 빠르게 상품을 받아보실 수 있도록 최선을 다하겠습니다.

    - 평균 배송 지연 기간: 2~5일
    - 급한 문의는 고객센터(02-1234-5678, 평일 09:00~18:00)로 연락해 주세요.

    고객님의 양해와 협조에 감사드립니다.`,
  },
  {
    id: 4,
    title: '[공지사항] - 여름 휴가 배송 안내',
    date: '2025.07.28',
    content: `여름 휴가 기간(7/29~8/2) 중 주문 건은 8/5부터 순차 발송됩니다. 
    양해 부탁드립니다.`,
  },
  {
    id: 5,
    title: '[공지사항] - 환불하기',
    date: '2025.07.24',
    content: `환불 관련 문의는 홈페이지에서 직접 처리되지 않으며,
    아래 고객센터 이메일 또는 전화로만 접수 가능합니다.

    - 이메일: hobbism@example.com
    - 전화: 02-1234-5678 (평일 09:00~18:00)

    빠르고 정확한 처리를 위해 문의 시 주문번호와 성함을 함께 남겨주세요.
    감사합니다.`,
  },
  {
    id: 6,
    title: '[공지사항] - 신규 아이템 오픈!',
    date: '2025.07.16',
    content: `더 나은 경험을 위해 새로운 캐릭터 아이템을 오픈했습니다! 
    앞으로도 많은 관심과 이용 부탁드립니다. 감사합니다.`,
  },
];

const PAGE_SIZE = 4;

export default function NoticePage() {
  const [page, setPage] = useState(1);

  const pagedNotices = notices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(notices.length / PAGE_SIZE);

  return (
    <div className="mx-5 mt-10 max-w-2xl">
      {/* 공지사항 목록 */}
      {pagedNotices.map(notice => (
        <div
          key={notice.id}
          className="mb-5 rounded-2xl bg-gray-100 px-5 py-4 shadow"
        >
          <div className="relative flex items-center gap-x-2">
            <Megaphone fill="#e5e7eb" />
            <h1 className="mb-2 font-semibold">{notice.title}</h1>
            <span className="absolute top-1 right-1 text-xs text-gray-500">
              {notice.date}
            </span>
          </div>
          <p className="whitespace-pre-line text-gray-600">{notice.content}</p>
        </div>
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="relative bottom-3 mt-4 flex justify-center gap-2">
        <button
          className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 pt-1.5 text-sm font-medium text-gray-700">
          {page} / {totalPages}
        </span>
        <button
          className="rounded bg-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

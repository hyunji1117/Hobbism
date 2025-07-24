import dayjs from 'dayjs';

function getTime(day = 0, second = 0) {
  return dayjs()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'admin@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `files/${clientId}/user-muzi.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          introduction: '반갑습니다',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '네오',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          introduction: '네오입니다',
        },
      },
    ],

    // 상품
    product: [
      // 홈카페 데이터
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 14000,
        // 배송비
        shippingFees: 4000,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '원두 에스쇼콜라',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/homecafe-01-main.webp`,
            name: 'homecafe-01-main.webp',
            originalname: 'homecafe-01-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/homecafe-01-main.webp`,
            name: 'homecafe-01-main.webp',
            originalname: 'homecafe-01-main.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['HOMECAFE'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'woomin',
          // 라이브 특별 기획 상품
          isLiveSpecial: true,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 11200,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 14000,
        // 배송비
        shippingFees: 4000,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '원두 에스쇼콜라',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/homecafe-02-main.webp`,
            name: 'homecafe-02-main.webp',
            originalname: 'homecafe-02-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/homecafe-02-main.webp`,
            name: 'homecafe-02-main.webp',
            originalname: 'homecafe-02-main.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['HOMECAFE'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'woomin',
          // 라이브 특별 기획 상품
          isLiveSpecial: true,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 11200,
        },
      },
      // 인형 데이터
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7000,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형1',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-01-main.webp`,
            name: 'doll-01-main.webp',
            originalname: 'doll-01-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-01-detail.webp`,
            name: 'doll-01-detail.webp',
            originalname: 'doll-01-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: true,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형2',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-02-main.webp`,
            name: 'doll-02-main.webp',
            originalname: 'doll-02-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-02-detail.webp`,
            name: 'doll-02-detail.webp',
            originalname: 'doll-02-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형3',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-03-main.webp`,
            name: 'doll-03-main.webp',
            originalname: 'doll-03-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-03-detail.webp`,
            name: 'doll-03-detail.webp',
            originalname: 'doll-03-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형4',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-04-main.webp`,
            name: 'doll-04-main.webp',
            originalname: 'doll-04-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-04-detail.webp`,
            name: 'doll-04-detail.webp',
            originalname: 'doll-04-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형5',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-05-main.webp`,
            name: 'doll-05-main.webp',
            originalname: 'doll-05-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-05-detail.webp`,
            name: 'doll-05-detail.webp',
            originalname: 'doll-05-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형6',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-06-main.webp`,
            name: 'doll-06-main.webp',
            originalname: 'doll-06-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-06-detail.webp`,
            name: 'doll-06-detail.webp',
            originalname: 'doll-06-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형7',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-07-main.webp`,
            name: 'doll-07-main.webp',
            originalname: 'doll-07-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-07-detail.webp`,
            name: 'doll-07-detail.webp',
            originalname: 'doll-07-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형8',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-08-main.webp`,
            name: 'doll-08-main.webp',
            originalname: 'doll-08-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-08-detail.webp`,
            name: 'doll-08-detail.webp',
            originalname: 'doll-08-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형9',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-09-main.webp`,
            name: 'doll-09-main.webp',
            originalname: 'doll-09-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-09-detail.webp`,
            name: 'doll-09-detail.webp',
            originalname: 'doll-09-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형10',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-10-main.webp`,
            name: 'doll-10-main.webp',
            originalname: 'doll-10-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-10-detail.webp`,
            name: 'doll-10-detail.webp',
            originalname: 'doll-10-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형11',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-11-main.webp`,
            name: 'doll-11-main.webp',
            originalname: 'doll-11-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-11-detail.webp`,
            name: 'doll-11-detail.webp',
            originalname: 'doll-11-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형12',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-12-main.webp`,
            name: 'doll-12-main.webp',
            originalname: 'doll-12-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-12-detail.webp`,
            name: 'doll-12-detail.webp',
            originalname: 'doll-12-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형13',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-13-main.webp`,
            name: 'doll-13-main.webp',
            originalname: 'doll-13-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-13-detail.webp`,
            name: 'doll-13-detail.webp',
            originalname: 'doll-13-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형14',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-14-main.webp`,
            name: 'doll-14-main.webp',
            originalname: 'doll-14-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-14-detail.webp`,
            name: 'doll-14-detail.webp',
            originalname: 'doll-14-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형15',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-15-main.webp`,
            name: 'doll-15-main.webp',
            originalname: 'doll-15-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-15-detail.webp`,
            name: 'doll-15-detail.webp',
            originalname: 'doll-15-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형16',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-16-main.webp`,
            name: 'doll-16-main.webp',
            originalname: 'doll-16-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-16-detail.webp`,
            name: 'doll-16-detail.webp',
            originalname: 'doll-16-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형17',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-17-main.webp`,
            name: 'doll-17-main.webp',
            originalname: 'doll-17-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-17-detail.webp`,
            name: 'doll-17-detail.webp',
            originalname: 'doll-17-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형18',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-18-main.webp`,
            name: 'doll-18-main.webp',
            originalname: 'doll-18-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-18-detail.webp`,
            name: 'doll-18-detail.webp',
            originalname: 'doll-18-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형19',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-19-main.webp`,
            name: 'doll-19-main.webp',
            originalname: 'doll-19-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-19-detail.webp`,
            name: 'doll-19-detail.webp',
            originalname: 'doll-19-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 7600,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '인형20',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/doll-20-main.webp`,
            name: 'doll-20-main.webp',
            originalname: 'doll-20-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/doll-20-detail.webp`,
            name: 'doll-20-detail.webp',
            originalname: 'doll-20-detail.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['DOLL'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'ayoung',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 5600,
        },
      },

      // 인테리어 데이터
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 33000,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '가구1',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/interior-01-main.webp`,
            name: 'interior-01-main.webp',
            originalname: 'interior-01-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/interior-01-detail.webp`,
            name: 'interior-01-deatil.webp',
            originalname: 'interior-01-deatil.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['INTERIOR'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'hyunji',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 20,
          // 최종 가격(할인가
          discountedPrice: 26400,
        },
      },
      // 향수 데이터
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 370000,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '아무아주 리플렉션',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/perfume-01-main.webp`,
            name: 'perfume-01-main.webp',
            originalname: 'perfume-01-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/perfume-01-detail.webp`,
            name: 'perfume-01-deatil.webp',
            originalname: 'perfume-01-deatil.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['PERFUME'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'youngchan',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 10,
          // 최종 가격(할인가
          discountedPrice: 333000,
        },
      },
      {
        _id: await nextSeq('product'),
        // 판매자 아이디
        seller_id: 1,
        // 상품가격
        price: 530000,
        // 배송비
        shippingFees: 0,
        // 사이트에 노출될지말지
        show: true,
        // 판매여부
        active: true,
        // 제품명
        name: '아무아주 메모와',
        // 재고수량
        quantity: 50,
        // 판매된 수량
        buyQuantity: 10,
        // 메인이미지
        mainImages: [
          {
            path: `files/${clientId}/perfume-02-main.webp`,
            name: 'perfume-02-main.webp',
            originalname: 'perfume-02-main.webp',
          },
        ],
        // 상세설명
        content: [
          {
            path: `files/${clientId}/perfume-02-detail.webp`,
            name: 'perfume-02-deatil.webp',
            originalname: 'perfume-02-deatil.webp',
          },
        ],
        // 등록날짜
        createdAt: getTime(-41, -60 * 60 * 2),
        // 수정날짜
        updatedAt: getTime(-40, -60 * 15),
        // 기타
        extra: {
          // 신상여부
          isNew: false,
          // 베스트 상품인가
          isBest: false,
          // 정렬 순서
          sort: 1,
          // 카테고리
          category: ['PERFUME'],
          // 추천 픽(누구의 추천인지)
          recommendedBy: 'youngchan',
          // 라이브 특별 기획 상품
          isLiveSpecial: false,
          // 할인율
          discountRate: 10,
          // 최종 가격(할인가
          discountedPrice: 477000,
        },
      },
    ],

    // 주문
    order: [],

    // 후기
    review: [],

    // 장바구니
    cart: [],

    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        type: 'user',
        target_id: 2,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 1,
        type: 'post',
        target_id: 1,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 2,
        type: 'user',
        target_id: 1,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 3,
        type: 'user',
        target_id: 1,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
    ],

    // QnA, 공지사항 등의 게시판

    // 코드
    code: [],

    // 설정
    config: [],
  };
};

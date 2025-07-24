export default function AddPoints(type: string, value: number = 1) {
  switch (type) {
    case 'purchase':
      return Math.floor(value / 1000); // 구매 상품 1000원당 1p
    case 'post':
      return 5 * value; // 글 작성 1개당 1p
    case 'comment':
      return 2 * value; // 댓글 작성 1개당 2p
    case 'bookmark':
      return 1 * value; // 북마크 1개당 1p
    case 'live_watch':
      return 5 * value; // 라이브 시청 횟수 1회당 5p
    case 'live_30min':
      return 20 * value; // 하나의 라이브 30분 경과 시 20p
    case 'live_purchase':
      return 100 * value; // 라이브를 통한 결재 시 100p
    default:
      return 0;
  }
}

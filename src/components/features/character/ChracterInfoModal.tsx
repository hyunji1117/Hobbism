import Modal, { ModalBackdrop, ModalPanel } from '@/components/common/Modal';

interface Props {
  onClose: () => void;
}

export default function CharacterInfoModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <ModalBackdrop />

      {/* <ModalPanel className="w-[300px] p-6 text-center">
        <div className="mb-4 text-center text-sm">
          <p>작성 중인 내용은 저장되지 않습니다</p>
          <p>정말 나가시겠습니까?</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg bg-gray-200 py-2"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-lg bg-black py-2 text-white"
          >
            확인
          </button>
        </div> */}
      {/* </ModalPanel> */}
      <ModalPanel className="fixed inset-0 z-11 flex items-center justify-center bg-black/40 px-4">
        <div className="max-h-[80vh] w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">레벨업 기준 안내</h2>

          <div className="mb-6 space-y-3 text-sm text-gray-700">
            <div>
              <h3 className="mb-1 font-semibold">&gt; 활동 항목 기준 포인트</h3>
              <ul className="list-inside list-disc space-y-1">
                <li>상품 구매 1,000원당 1P</li>
                <li>커뮤니티 글 작성 1건당 5P</li>
                <li>커뮤니티 댓글 작성 1건당 2P</li>
                <li>북마크 추가 1회당 1P</li>
                <li>라이브 시청 5P</li>
                <li>라이브 시청 30분마다 20P</li>
                <li>라이브 내 상품 결제 100P</li>
              </ul>
            </div>

            <div>
              <h3 className="mt-4 mb-1 font-semibold">
                &gt; 레벨 기준 (누적 포인트)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>LV1: 0 ~ 49P - 가짜팬</li>
                <li>LV2: 50 ~ 149P - 조금팬</li>
                <li>LV3: 150 ~ 299P - 관심팬</li>
                <li>LV4: 300 ~ 599P - 찐팬</li>
                <li>LV5: 600 ~ 999P - 왕팬</li>
                <li>LV6: 1000 ~ 1499P - 매니아</li>
                <li>LV7: 1500 ~ 2199P - 레전드</li>
                <li>LV8: 2200 ~ 2999P - 오덕</li>
                <li>LV9: 3000p 이상 - VIP / 십덕</li>
              </ul>
            </div>
          </div>

          <button
            className="mt-4 w-full rounded-md bg-[#FE508B] py-2 text-white hover:bg-[#E6477B]"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </ModalPanel>
    </Modal>
  );
}

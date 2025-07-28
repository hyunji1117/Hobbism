export default function PolicyPage() {
  return (
    <div className="mx-auto px-8 py-5">
      <h1 className="mb-4 text-xl font-semibold">Hoobism 개인정보처리방침</h1>
      <p className="mb-4 text-gray-500">
        Hobbism은 서비스 제공에 있어 정보보호 등에 관한 법률, 개인정보보호법 등
        관련 개인정보보호 규정을 철저히 준수하며, 관련법령에 따라 개인정보
        처리방침을 정하여 이용자의 권익 보호에 최선을 다하고 있습니다.
      </p>
      <p className="mb-4 text-gray-500">
        또한, 본 개인정보 처리방침을 통하여 Hobbism이 어떤 정보를 수집하고,
        수집한 정보를 어떻게 사용하며, 필요에 따라 누구와 이를 공유하며,
        이용목적을 달성한 정보를 어떻게 파기하는지 등에 대한 정보를 알려
        드립니다. 본 개인정보 처리방침은 Hobbism이 제공하는 서비스에 제공됩니다.
      </p>
      <p className="mb-4 text-gray-500">
        본 방침은 2025년 8월 8일부터 시행됩니다.
      </p>

      <hr className="my-6" />

      <h2 className="mb-2 text-lg font-semibold text-gray-700">
        (가) 개인정보의 수집 및 이용목적
      </h2>
      <ul className="mb-4 text-gray-500">
        <li className="mb-4">
          회원 식별 및 서비스 제공을 위해 개인정보를 수집하며, 카카오, 네이버,
          구글 소셜 로그인 시 수집되는 정보는 본인 확인에 사용됩니다. 커뮤니티
          기능(글 작성, 댓글 등록, 북마크 등)을 제공하고 해당 활동 기록을
          관리하며, 캐릭터 페이지에서는 포인트 적립 내역을 기반으로 아이템을
          구매하여 커스텀된 캐릭터의 변경 이력을 관리합니다.
        </li>

        <li className="mb-4">
          또한, 쇼핑서비스에서는 카테고리별 취미 상품의 주문, 결제 및 배송
          처리를 위해 정보를 활용하며, 라이브 이커머스 기능을 통해 실시간 방송
          중 특별 상품 구매가 가능하도록 지원합니다. 이와 함께, 상품 주문 시
          입력되는 배송지 주소 및 전화번호 등은 정확한 배송과 고객 응대를 위한
          필수 정보로 수집되며, 마이페이지를 통해 수정할 수 있습니다.
        </li>

        <p>회원 가입 시 수집되는 개인정보는 아래와 같습니다.</p>
      </ul>

      <h2 className="mb-2 text-lg font-semibold text-gray-700">
        (나) 수집하는 개인정보 항목
      </h2>
      <ul className="mb-4 list-disc pl-5 text-gray-500">
        <li>필수: 이름, 이메일, 프로필 이미지 (로그인 시)</li>
        <li>
          서비스 이용 기록: 커뮤니티 글/댓글, 캐릭터 변경, 포인트, 구매내역 등
        </li>
        <li>주문/배송: 배송지 주소, 전화번호 (상품 구매 시)</li>
      </ul>

      <h1 className="mb-2 text-lg font-semibold text-gray-700">
        (다) 개인정보의 보유 및 이용기간
      </h1>
      <ul className="mb-4 text-gray-500">
        <li>
          회원 탈퇴 시 수집된 개인정보는 지체 없이 파기되며, 단, 관련 법령에
          따라 일정 기간 보관이 필요한 정보는 해당 법령에서 정한 기간 동안
          안전하게 보관한 후 파기됩니다.
        </li>
      </ul>

      <h1 className="mb-2 text-lg font-semibold text-gray-700">
        (라) 개인정보의 제3자 제공 및 처리 위탁
      </h1>
      <ul className="mb-4 text-gray-500">
        <li>
          서비스 운영 및 상품 배송 등 필요한 경우에 한해 최소한의 개인정보만을
          외부 업체에 제공하거나 위탁하며, 법령에서 정한 경우를 제외하고는
          이용자의 동의 없이 외부 기관에 정보를 제공하지 않습니다.
        </li>
      </ul>

      <hr className="my-6" />
      <p className="text-center text-sm text-gray-500">
        본 방침은 서비스 운영 정책에 따라 변경될 수 있으며, <br />
        변경 시 웹사이트 공지사항을 통해 안내됩니다.
      </p>
    </div>
  );
}

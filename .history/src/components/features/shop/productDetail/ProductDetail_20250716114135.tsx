// 상품 상세 정보 컴포넌트
export const ProductDetailInfo = () => {
  return (
    <section>
      <h1>아디다스 언더아머 2.0 윈터브레이크</h1>
      <p>정보를 적어주세요.</p>
      <span>167,000원</span>
      <span>30%</span>
      <span>139,000원</span>
      <span>무료배송</span>
    </section>
  );
};

// 상품 수량 선택 컴포넌트
export const ProductQuantitySelector = () => {
  return (
    <section>
      <h2>리미티드 스페이스블랙 L</h2>
      <div id="counter">
        <button type="button" onClick={handleDown}>
          -
        </button>
        <button type="button" onClick={event => handleReset(event)}>
          0
        </button>
        <button type="button" onClick={handleUp}>
          +
        </button>
      </div>
      <span>158,900원</span>
    </section>
  );
};

export const ProductActionButtons = () => {
  return (
    <section>
      <button type="button">장바구니에 담기</button>
      <button type="button">바로 구매하기</button>
    </section>
  );
};

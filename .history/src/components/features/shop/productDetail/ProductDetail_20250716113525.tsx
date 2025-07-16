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

export const ProductQuantitySelector = () => {
  return (
    <section>
      <h2>리미티드 스페이스블랙 L</h2>
      <input type="number" min="1" defaultValue="1" />
      <button>장바구니에 담기</button>
    </section>
  );
};

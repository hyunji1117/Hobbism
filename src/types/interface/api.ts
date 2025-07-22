// 입력값 검증 실패시 에러 정보
export interface ServerValidationError {
  type: string; // 에러 타입
  value: string; // 입력된 값
  msg: string; // 에러 메시지 ("이메일은 필수입니다")
  location: string; // 어디서 에러? (body, query 등)
}

// 여러 필드의 검증 에러들
export type ServerValidationErrors<E> = Partial<
  Record<keyof E, ServerValidationError>
>;

// API 서버 응답의 기본 구조
export type ApiRes<T, E = never> =
  | { ok: 1; item: T } // 성공시
  | { ok: 0; message: string; errors?: ServerValidationErrors<E> }; // 실패시

// 서버 함수에서 Promise로 반환할 때
export type ApiResPromise<T> = Promise<ApiRes<T>>;

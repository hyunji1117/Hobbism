// 결제 버튼 컴포넌트
'use client';

import { CSSProperties } from 'react';

interface PaymentButtonProps {
  amount?: number;
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'fixed';
  fullWidth?: boolean;
  style?: CSSProperties;
}

export function PaymentButton({
  amount,
  text,
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  style,
}: PaymentButtonProps) {
  // variant별 기본 스타일
  const getButtonClassName = () => {
    const baseClass = 'cursor-pointer font-semibold transition-colors';

    switch (variant) {
      case 'primary':
        return `${baseClass} rounded-[5px] bg-[#4B5563] text-white hover:bg-[#2C2F33] w-[60%] min-w-[105px] px-2 py-2 text-[16px]`;
      // case 'secondary':
      //   return `${baseClass} rounded-[5px] bg-[#4B5563] text-white hover:bg-[#2C2F33] px-2 py-2 text-[16px]`;
      case 'secondary':
        return `${baseClass} rounded-[5px] bg-[#4B5563] text-white hover:bg-[#2C2F33] px-2 py-2 text-[16px]`;
      case 'fixed':
        return `${baseClass} min-w-[105px] fixed bottom-[2%] left-1/2 w-[93vw] max-w-[572px] -translate-x-1/2 rounded-[5px] bg-[#4B5563] px-2 py-2 text-lg text-white md:w-full`;
      default:
        return baseClass;
    }
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isLoading) return '처리 중...';
    if (text) return text;
    if (amount !== undefined) return `${amount.toLocaleString()}원 결제하기`;
    return '결제하기';
  };

  // fullWidth 스타일 적용
  const getFullWidthStyle = (): CSSProperties => {
    if (fullWidth && variant !== 'fixed') {
      return { width: '100%', ...style };
    }
    return style || {};
  };

  return (
    <>
      {/* 버튼의 높이만큼 배경이 보이도록 여백 추가 */}
      <div className="pb-[80px]"></div>
      <div className="fixed bottom-0 left-0 z-0 h-[80px] w-full bg-white pt-3">
        <button
          type={onClick ? 'button' : 'submit'}
          onClick={onClick}
          disabled={disabled || isLoading}
          className={`${getButtonClassName()} ${
            disabled || isLoading ? 'cursor-not-allowed opacity-50' : ''
          }w-[60%] min-w-[105px] cursor-pointer rounded-[5px] bg-[#4B5563] px-2 py-2 text-[16px] font-semibold text-white hover:bg-[#2C2F33]`}
          style={getFullWidthStyle()}
        >
          {getButtonText()}
        </button>
      </div>
    </>
  );
}

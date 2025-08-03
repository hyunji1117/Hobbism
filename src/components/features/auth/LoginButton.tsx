import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';

interface LoginButtonProps {
  onClick?: () => void;
  className: string;
}

export function LoginButton({
  children,
  onClick,
  className,
}: PropsWithChildren<LoginButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={cn(className, 'w-full cursor-pointer')}
    >
      {children}
    </button>
  );
}
export default LoginButton;

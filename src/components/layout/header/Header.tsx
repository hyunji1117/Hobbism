import { cn } from '@/lib/utils';
import {
  Children,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

interface SlotProps {
  className?: string;
}

function LeftContent({ children, className }: PropsWithChildren<SlotProps>) {
  return (
    <div className={cn('absolute left-4 flex items-center', className)}>
      {children}
    </div>
  );
}

function Title({ children, className }: PropsWithChildren<SlotProps>) {
  return (
    <h3
      className={cn(
        'flex w-full items-center justify-center text-lg font-medium',
        className,
      )}
    >
      {children}
    </h3>
  );
}

function RightContent({ children, className }: PropsWithChildren<SlotProps>) {
  return (
    <div className={cn('absolute right-4 flex gap-6', className)}>
      {Children.toArray(children).map((child, idx) => (
        <div key={idx}>{child}</div>
      ))}
    </div>
  );
}

function extractSlot<T extends FunctionComponent<PropsWithChildren<SlotProps>>>(
  children: ReactNode,
  Component: T,
  limit: number = 1,
): ReactElement<PropsWithChildren<SlotProps>, T>[] {
  return Children.toArray(children)
    .filter(
      (child): child is ReactElement<PropsWithChildren<SlotProps>, T> =>
        isValidElement(child) && child.type === Component,
    )
    .slice(0, limit);
}

interface HeaderBarProps {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
}

function Header({ children, className, innerClassName }: HeaderBarProps) {
  const left = extractSlot(children, LeftContent);
  const title = extractSlot(children, Title);
  const right = extractSlot(children, RightContent);

  return (
    <>
      <header className="h-12 w-full">
        <div className={cn('h-full w-full', className)} />
        <div
          className={cn(
            'fixed top-0 z-50 flex min-h-12 w-full max-w-[600px] items-center bg-white',
            innerClassName,
          )}
        >
          <div className="relative flex w-full items-center">
            {left}
            {title}
            {right}
          </div>
        </div>
      </header>
    </>
  );
}

export const HeaderNav = Object.assign(Header, {
  LeftContent,
  Title,
  RightContent,
});

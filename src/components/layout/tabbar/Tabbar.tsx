'use client';
import { BarItem } from '@/components/layout/tabbar/BarItem';
import { usePathname } from 'next/navigation';
import { TAB_BAR_ITEMS } from '@/constant/index';

export default function TabBar() {
  const pathname = usePathname();

  const hiddenPages = ['/user/setting', 'user/edit'];

  if (hiddenPages.some(page => pathname.includes(page))) {
    return null;
  }
  const barIndex = TAB_BAR_ITEMS.findIndex(item => item.route === pathname);

  return (
    <>
      <nav className="fixed bottom-0 z-50 flex h-14 w-full max-w-[600px] items-center justify-around border-t border-[#EAEAEA] bg-white">
        {TAB_BAR_ITEMS.map((item, i) => (
          <BarItem key={i} {...item} index={i} isSelected={i === barIndex} />
        ))}
      </nav>
      <div className="h-14" />
    </>
  );
}

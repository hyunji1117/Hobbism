'use client';

import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';

interface LogoButtonProps {
  className?: string;
}

export function SettingButton({ className }: LogoButtonProps) {
  return (
    <Link href="/user/setting" className={className}>
      <SettingsIcon />
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface BarItemProps {
  label: string;
  icon: LucideIcon;
  index: number;
  route: string;
  isSelected: boolean;
  selectedColor: string;
}

export function BarItem({
  label,
  icon: Icon,
  route,
  isSelected,
  selectedColor,
}: BarItemProps) {
  return (
    <Link
      href={route}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.div
        whileTap={{ scale: 1.2 }}
        animate={{ scale: isSelected ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon
          className="mb-1 size-5"
          stroke={isSelected ? selectedColor : '#4B5563'}
        />
      </motion.div>
      <span className="text-xs text-[#4B5563]">{label}</span>
    </Link>
  );
}

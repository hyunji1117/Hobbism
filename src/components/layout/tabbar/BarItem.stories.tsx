import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BarItem } from '@/components/layout/tabbar/BarItem';
import { MessageCircle } from 'lucide-react';

const meta: Meta<typeof BarItem> = {
  title: 'components/layout/TabBar/BarItem',
  component: BarItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'center',
  },
  args: {
    label: '피드',
    icon: MessageCircle,
    index: 0,
    route: '/feed',
    isSelected: false,
  },
};

export default meta;

type Story = StoryObj<typeof BarItem>;

export const Default: Story = {
  args: {
    isSelected: true,
  },
};

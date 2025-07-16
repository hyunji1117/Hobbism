import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TabBar from '@/components/layout/tabbar/Tabbar';

const meta: Meta<typeof TabBar> = {
  title: 'components/layout/TabBar/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  args: {
    props: '/feed', // 홈 탭 활성화
  },
};

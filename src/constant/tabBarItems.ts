// constants/tabBarItems.ts
import {
  MessageCircle,
  Ghost,
  Radio,
  ShoppingBag,
  UserRound,
} from 'lucide-react';

export const TAB_BAR_ITEMS = [
  {
    label: '커뮤니티',
    icon: MessageCircle,
    route: '/community',
    selectedColor: '#51AAED',
  },
  {
    label: '캐릭터',
    icon: Ghost,
    route: '/character',
    selectedColor: '#D2E308',
  },
  { label: '라이브', icon: Radio, route: '/live', selectedColor: '#FE508B' },
  {
    label: '쇼핑',
    icon: ShoppingBag,
    route: '/shop',
    selectedColor: '#6E67DA',
  },
  {
    label: '마이',
    icon: UserRound,
    route: '/user',
    selectedColor: '#FAB91D',
  },
];

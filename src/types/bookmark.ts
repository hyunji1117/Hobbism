import { User } from '@/types/user';

export interface Bookmark {
  type: 'user' | 'product' | 'post';
  user_id: number;
  target_id: number;
  user: Pick<User, '_id' | 'name' | 'image' | 'email'>;
  _id: number;
  createdAt: string;
}

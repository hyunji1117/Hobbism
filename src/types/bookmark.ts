import { User } from '@/types/user';

export interface Bookmark {
  type: 'user' | 'product' | 'post';
  user_id: number;
  target_id: number;
  user: Pick<User, '_id' | 'name' | 'image' | 'email' | 'extra'>;
  _id: number;
  createdAt: string;
}

export interface BookmarkPost {
  createAt: string;
  post: {
    image: string[];
    title: string;
    type: string;
    user: Pick<User, '_id' | 'image' | 'name'>;
    _id: number;
  };
  _id: number;
}

export interface GetUserBookmarkResponseDto {
  byUser: Bookmark[];
  user: Bookmark[];
  product: Bookmark[];
  post: BookmarkPost[];
}

export interface Post {
  id: string;
  title: string;
  text: string;
  user: string;
  likes: [];
  comments: [];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostState {
  allPosts: Post[];
  error: string;
  loading: boolean;
}

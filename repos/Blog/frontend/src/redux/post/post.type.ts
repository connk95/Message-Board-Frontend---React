export interface Post {
  title: string;
  test: string;
  createdAd: Date;
  updatedAt: Date;
}

export interface PostState {
  posts: Post[];
  error: string;
  loading: boolean;
}

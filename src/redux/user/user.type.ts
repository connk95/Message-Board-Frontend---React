import { Post } from "../post/post.type";
import { Comment } from "../post/comment.type";
import { baseState } from "../types";

export interface User {
  username: string;
  password: string;
  email: string;
  posts?: Post[];
  likes?: [];
  comments?: Comment[];
  _id?: string;
}

export interface UserState extends baseState {
  user: User;
}

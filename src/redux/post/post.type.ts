import { baseMongooseType, baseState } from "../types";
import { User } from "../user/user.type";
import { Comment } from "./comment.type";

export interface Post extends baseMongooseType {
  title: string;
  text: string;
  user: User;
  likes?: User[];
  comments?: Comment[];
}

export interface PostState extends baseState {
  allPosts: Post[];
  singlePost: Post;
}

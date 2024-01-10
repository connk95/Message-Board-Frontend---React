import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "./post.type";
import { Comment } from "./comment.type";

type GenericState = {
  auth: {
    loggedInUser: {
      user: string;
    };
  };
};

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    return res.data;
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return res.data;
});

export const newPost = createAsyncThunk(
  "posts/newPost",
  async ({ title, text }: Post, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
      title,
      text,
      user: state.auth.loggedInUser.user,
    });
    return res;
  }
);

export const newComment = createAsyncThunk(
  "posts/newComment",
  async ({ text, postId }: Comment, thunkApi) => {
    const state = thunkApi.getState() as GenericState;
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}`,
      {
        postId,
        text,
        user: state.auth.loggedInUser.user,
      }
    );
    return res.data;
  }
);

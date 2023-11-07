import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "./post.type";
import { fetchPosts } from "./post.actions";
import { Post } from "./post.type";

const initialState: PostState = {
  posts: [],
  error: "",
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts = [];
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});

// export const { add: }

export default postSlice.reducer;

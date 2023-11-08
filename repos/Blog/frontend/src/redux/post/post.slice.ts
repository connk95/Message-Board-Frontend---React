import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "./post.type";
import { fetchPosts } from "./post.actions";
import { Post } from "./post.type";

const initialState: PostState = {
  allPosts: [],
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
        state.allPosts = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(fetchPosts.pending, (state) => {
      state.allPosts = [];
      state.error = "";
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.allPosts = [];
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});

// export const { add: }

export default postSlice.reducer;

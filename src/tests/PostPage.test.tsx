import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import PostPage from "../pages/PostPage";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchSinglePost, newComment } from "../redux/post/post.actions";

vi.mock("axios");

describe("PostPage", () => {
  const initialState = {
    users: {
      user: {
        username: "mockUser",
        password: "mockPass",
        email: "mockEmail",
        _id: "mockUserId",
      },
      error: "",
      loading: false,
    },
    auth: {
      loggedInUser: {
        access_token: "mockToken",
        user: {
          username: "mockUser",
          password: "mockPass",
          email: "mockEmail",
          _id: "mockUserId",
        },
      },
      newUser: {
        username: "",
        password: "",
        email: "",
      },
      loading: false,
      error: "",
    },
    posts: {
      loading: false,
      allPosts: [],
      singlePost: {
        title: "mocktitle",
        text: "mockText",
        user: {
          username: "mockPoster",
          password: "mockPass",
          email: "mockEmail",
          _id: "mockUserId",
        },
        createdAt: "2024-01-01T12:00:00.000+00:00",
        _id: "mockPostId",
        comments: [
          {
            text: "mockComment",
            postId: "mockPostId",
            user: {
              username: "mockCommenter",
              password: "mockPass",
              email: "mockEmail",
              _id: "mockUserId",
            },
            createdAt: "2024-01-01T12:00:00.000+00:00",
            _id: "mockCommentId",
          },
        ],
      },
    },
  };

  const mockSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
  });

  const mockStore = configureStore(mockSlice);

  it("Retrieves & renders post & comment", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <PostPage />
        </Router>
      </Provider>
    );

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({ data: {} });

    waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        fetchSinglePost(initialState.posts.singlePost._id)
      );
    });

    waitFor(() => {
      expect(screen.getByText(initialState.posts.singlePost.title))
        .toBeInTheDocument;
      expect(screen.getByText(initialState.posts.singlePost.text))
        .toBeInTheDocument;
      expect(screen.getByText(initialState.posts.singlePost.user.username))
        .toBeInTheDocument;
      expect(screen.getByText(initialState.posts.singlePost.createdAt))
        .toBeInTheDocument;

      expect(screen.getByText(initialState.posts.singlePost.comments[0].text))
        .toBeInTheDocument;
      expect(
        screen.getByText(
          initialState.posts.singlePost.comments[0].user.username
        )
      ).toBeInTheDocument;
      expect(
        screen.getByText(initialState.posts.singlePost.comments[0].createdAt)
      ).toBeInTheDocument;
    });
  });

  it("dispatches comment data", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <PostPage />
        </Router>
      </Provider>
    );

    const commentInput = screen.getByLabelText(/comment/i);

    userEvent.type(commentInput, "mockCommentTwo");

    const submitButton = screen.getByRole("button", { name: "Submit" });

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({ data: {} });

    userEvent.click(submitButton);

    waitFor(() => {
      // expect(onSubmit).toHaveBeenCalled()
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        newComment({
          text: "mockCommentTwo",
          postId: initialState.posts.singlePost._id,
          user: {
            username: "mockCommenter",
            password: "mockPass",
            email: "mockEmail",
            _id: "mockUserId",
          },
          createdAt: "2024-01-01T12:00:00.000+00:00",
          updatedAt: "2024-01-01T12:00:00.000+00:00",
          _id: "mockId",
        })
      );
    });
  });
});

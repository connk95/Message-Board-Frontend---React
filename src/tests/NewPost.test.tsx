import { describe, expect, it, vi } from "vitest";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { NewPost } from "../pages/NewPost";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { newPost } from "../redux/post/post.actions";

vi.mock("axios");

describe("NewPostPage", () => {
  const initialState = {
    auth: {
      loggedInUser: {
        access_token: "mockToken",
        user: {
          username: "mockUser",
          password: "mockPass",
          email: "mockEmail",
          _id: "mockId",
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
    },
  };

  const mockAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
  });

  const mockStore = configureStore(mockAuthSlice);

  it("dispatches post data", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <NewPost />
        </Router>
      </Provider>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const textInput = screen.getByLabelText(/text/i);

    userEvent.type(titleInput, "mockTitle");
    userEvent.type(textInput, "mockText");

    waitFor(() => {
      expect(titleInput).toHaveValue("mockTitle");
      expect(textInput).toHaveValue("mockText");
    });

    const submitButton = screen.getByRole("button", { name: "Submit" });

    // const dispatchSpy = vi.spyOn(mockStore, "dispatch");
    // dispatchSpy.mockResolvedValueOnce({ data: {} });

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({ data: {} });

    userEvent.click(submitButton);

    waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        newPost({
          title: "mockTitle",
          text: "mockText",
          user: initialState.auth.loggedInUser.user,
        })
      );
    });

    waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

  it("will not allow posting without being logged in"),
    () => {
      const loggedOutState = {
        auth: {
          loggedInUser: {
            access_token: "",
            user: {
              username: "",
              password: "",
              email: "",
              _id: "",
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
        },
      };

      const loggedOutSlice = createSlice({
        name: "auth",
        initialState: loggedOutState,
        reducers: {},
      });

      const loggedOutStore = configureStore(loggedOutSlice);

      render(
        <Provider store={loggedOutStore}>
          <Router>
            <NewPost />
          </Router>
        </Provider>
      );

      const titleInput = screen.getByLabelText(/title/i);
      const textInput = screen.getByLabelText(/text/i);
      const loginMessage = screen.getByText("Please sign in to make a post.");

      expect(titleInput).not.toBeInTheDocument;
      expect(textInput).not.toBeInTheDocument;
      expect(loginMessage).toBeInTheDocument;
    };
});

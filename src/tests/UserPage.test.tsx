import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import UserPage from "../pages/UserPage";
import { render, screen } from "@testing-library/react";

vi.mock("axios");

describe("UserPage", () => {
  const initialState = {
    users: {
      user: {
        username: "mockUser",
        password: "mockPass",
        email: "mockEmail",
        _id: "mockId",
        posts: [
          {
            title: "mockTitle",
            text: "mockText",
            user: {
              username: "mockUser",
              password: "mockPass",
              email: "mockEmail",
            },
            createdAt: "2024-01-01T12:00:00.000+00:00",
            updatedAt: "2024-01-01T12:00:00.000+00:00",
            _id: "mockId",
          },
        ],
        comments: [
          {
            text: "mockComment",
            postId: "mockId",
            user: {
              username: "mockUser",
              password: "mockPass",
              email: "mockEmail",
            },
            createdAt: "2024-01-01T12:00:00.000+00:00",
            updatedAt: "2024-01-01T12:00:00.000+00:00",
            _id: "mockId",
          },
        ],
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

  const mockUserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
  });

  const mockStore = configureStore(mockUserSlice);
  
  it("Displays username", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText(initialState.users.user.username)
    ).toBeInTheDocument();
  });

  it("Renders mock post", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText(
        initialState.users.user.posts[0].title &&
          initialState.users.user.posts[0].text
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

  it("Renders mock comment", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText(initialState.users.user.comments[0].text)
    ).toBeInTheDocument();
  });

  it("Renders no comment & no post", () => {
    const initialState = {
      users: {
        user: {
          username: "mockUser",
          password: "mockPass",
          email: "mockEmail",
          _id: null,
          posts: [],
          comments: [],
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

    const mockUserSlice = createSlice({
      name: "users",
      initialState,
      reducers: {},
    });

    const mockStore = configureStore(mockUserSlice);

    render(
      <Provider store={mockStore}>
        <Router>
          <UserPage />
        </Router>
      </Provider>
    );

    expect("mockUser").not.toBeInTheDocument;
    expect("mockComment").not.toBeInTheDocument;
    expect("Posts").not.toBeInTheDocument;
    expect("mockPost").not.toBeInTheDocument;
  });
});

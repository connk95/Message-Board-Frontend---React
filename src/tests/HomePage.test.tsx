import { HomePage } from "../pages/HomePage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { store } from "../redux/store";
import { describe, expect, it, vi } from "vitest";
import { Post } from "../redux/post/post.type";
import { waitFor } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

vi.mock("axios");

describe("HomePage", () => {
  const mockPosts: Post[] = [
    {
      title: "mockTitle1",
      text: "mockText1",
      user: {
        username: "mockUser",
        password: "mockPass",
        email: "mockEmail",
      },
      createdAt: "2024-01-01T12:00:00.000+00:00",
      updatedAt: "2024-01-01T12:00:00.000+00:00",
      _id: "mockId",
    },
  ];

  it("Renders h4 element", () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const headerElement = screen.getByText("All posts");

    expect(headerElement).toBeInTheDocument();
  });

  it("Renders post", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockPosts });

    render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPosts[0].title));
    });
  });

  it("Renders New Post button when user is logged in", () => {
    const initialState = {
      auth: {
        loggedInUser: {
          access_token: "mockToken",
          user: {
            username: "mockUser",
            password: "mockPass",
            email: "mockEmail",
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

    render(
      <Provider store={mockStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});

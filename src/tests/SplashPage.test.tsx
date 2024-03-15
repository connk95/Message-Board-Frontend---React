import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import SplashPage from "../pages/SplashPage";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("SplashPage", () => {
  const initialState = {
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
  };

  const mockAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
  });

  const mockStore = configureStore(mockAuthSlice);

  it("redirects to home page", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SplashPage />
        </Router>
      </Provider>
    );

    // const homeButton = screen.getByRole("button", { name: /home/i });
    const homeButton = screen.getByText("Home");

    userEvent.click(homeButton);

    waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

  it("redirects to signup page", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SplashPage />
        </Router>
      </Provider>
    );

    const signupButton = screen.getByText("Create Account");

    userEvent.click(signupButton);

    waitFor(() => {
      expect(window.location.pathname).toBe("/signup");
    });
  });

  it("redirects to login page", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SplashPage />
        </Router>
      </Provider>
    );

    const loginButton = screen.getByText("Login");

    userEvent.click(loginButton);

    waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  it("doesn't render signup or login when logged in", () => {
    const loggedInState = {
      auth: {
        loggedInUser: {
          access_token: "mockAccessToken",
          user: {
            username: "mockUsername",
            password: "mockPassword",
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

    const loggedInStore = configureStore(
      createSlice({
        name: "auth",
        initialState: loggedInState,
        reducers: {},
      })
    );

    render(
      <Provider store={loggedInStore}>
        <Router>
          <SplashPage />
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/Login/i)).toBeNull();
    expect(screen.queryByText(/Create Account/i)).toBeNull();
  });
});

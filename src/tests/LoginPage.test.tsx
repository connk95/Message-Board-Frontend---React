import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Login } from "../pages/LoginPage";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { userLogin } from "../redux/auth/auth.actions";
import { afterEach } from "vitest";
import { fireEvent } from "@testing-library/react";

vi.mock("axios");

describe("LoginPage", () => {
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("dispatches user data", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const usernameInput = screen.getByRole("textbox", { name: "Username" });
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, "mockUsername");
    userEvent.type(passwordInput, "mockPassword");

    waitFor(() => {
      expect(usernameInput).toHaveValue("mockUsername");
      expect(passwordInput).toHaveValue("mockPassword");
    });

    const submitButton = screen.getByRole("button", { name: "Sign In" });

    vi.spyOn(mockStore, "dispatch").mockResolvedValueOnce({ data: {} });

    userEvent.click(submitButton);

    waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        userLogin({ username: "mockUsername", password: "mockPassword" })
      );
    });
  });

  it("redirects after successful login attempt", async () => {
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
          <Login />
        </Router>
      </Provider>
    );

    const submitButton = screen.getByTestId(/signInButton/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

  it("produces error after uncessfull login attempt", () => {
    const errorState = {
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
        error: "mockError",
        loading: false,
      },
    };

    const errorStore = configureStore(
      createSlice({
        name: "auth",
        initialState: errorState,
        reducers: {},
      })
    );

    render(
      <Provider store={errorStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const submitButton = screen.getByTestId(/signInButton/i);

    userEvent.click(submitButton);

    waitFor(() => {
      expect(
        screen.getByText(/Invalid username or password. Please try again/i) ||
          screen.getByText(/errorState.auth.error/i)
      ).toBeInTheDocument();
    });
  });
});

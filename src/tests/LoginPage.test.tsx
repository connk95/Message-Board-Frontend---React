import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Login } from "../pages/LoginPage";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

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
    name: "users",
    initialState,
    reducers: {},
  });

  const mockStore = configureStore(mockAuthSlice);

  it("Displays login inputs", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const usernameInput = screen.getByRole("textbox", { name: "Username" });
    // const passwordInput = screen.getByRole("textbox", { name: "Password" });

    userEvent.type(usernameInput, "mockUsername");
    // userEvent.type(passwordInput, "mockPassword");

    expect(usernameInput).toBeInTheDocument();
    // expect(passwordInput).toBeInTheDocument();

    await waitFor(() => {
      expect(usernameInput).toHaveValue("mockUsername");
      // expect(passwordInput).toHaveValue("mockPassword");
    });
  });
});

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import { store } from "./redux/store";
import { SignUp } from "./pages/SignUpPage";
import { Login } from "./pages/LoginPage";
import { NewPost } from "./pages/NewPost";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/auth/auth.actions";
import SplashPage from "./pages/SplashPage";
import { theme } from "./styles/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme(theme);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoggedInUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserPage />} />
          </Routes>
        </Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;

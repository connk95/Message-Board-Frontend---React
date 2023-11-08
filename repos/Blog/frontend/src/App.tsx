import { lazy, useEffect } from "react";
import { Provider } from "react-redux";
import { Grid, Card, Typography, CardContent } from "@mui/material";
import { Route, Router, Switch } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./redux/hooks";
import { fetchPosts } from "./redux/post/post.actions";
import { store } from "./redux/store";

// const LoginPage = lazy(() =>
//   import("./pages/LoginPage").then((module) => ({
//     default: module.LoginPage,
//   }))
// );

const PostPage = lazy(() =>
  import("./pages/PostPage").then((module) => ({
    default: module.PostPage,
  }))
);

// const UserPage = lazy(() =>
//   import("./pages/UserPage").then((module) => ({
//     default: module.UserPage,
//   }))
// );

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const posts = store.getState().posts;

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    // <Router>
    <Provider store={store}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography>Posts</Typography>
          {posts.allPosts.map((post) => (
            <Card key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <CardContent>
                  <Typography>{post.title}</Typography>
                  <Typography>{post.text}</Typography>
                  <Typography>
                    posted at {post.createdAt.toISOString()} by {post.user}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Provider>
    // </Router>
  );
};

export default App;

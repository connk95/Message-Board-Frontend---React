import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../redux/post/post.actions";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export const PostPage = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <Typography>Posts</Typography>
      {posts.map((post) => (
        <Card key={post.id}>
          <Link to={}>
            <CardContent>
              <Typography>{post.title}</Typography>
              <Typography>{post.text}</Typography>
              <Typography>
                posted at {post.date} by {post.user}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

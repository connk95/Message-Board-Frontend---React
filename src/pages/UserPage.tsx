import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/user/user.actions";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Linkify } from "../utils/utilities";

export const UserPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.users);

  useEffect(() => {
    /* istanbul ignore else -- @preserve */
    if (auth.loggedInUser.access_token) {
      const userId = auth.loggedInUser.user._id;
      /* istanbul ignore else -- @preserve */
      if (userId) {
        dispatch(fetchUser(userId));
      }
    }
  }, [dispatch, auth]);

  return (
    <Container component="main" sx={{ mt: 12 }}>
      <CssBaseline />
      {!user.user._id ? (
        <Box sx={{ mt: "19%", ml: "47%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Username
                  </Typography>
                  <Typography>{user.user.username}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {user.user.posts && user.user.posts.length > 0 ? (
              <Grid item xs={12}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 20, ml: 2, mt: 2 }}
                >
                  Posts
                </Typography>
                {user.user.posts
                  .slice()
                  .reverse()
                  .map((post) => (
                    <Link to={`/posts/${post._id}`} key={post._id}>
                      <Card sx={{ my: 1 }}>
                        <CardContent>
                          <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                            {post.title}
                          </Typography>
                          <Linkify>{post.text}</Linkify>
                          <Typography sx={{ fontSize: 14 }}>
                            posted at {post.createdAt.slice(11, 16)} on{" "}
                            {post.createdAt.slice(0, 10)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </Grid>
            ) : (
              <></>
            )}
            {user.user.comments && (
              <Grid item xs={12} sx={{ mb: 8 }}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 20, ml: 2, mt: 2 }}
                >
                  Comments
                </Typography>
                {user.user.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                    <Link to={`/posts/${comment.postId}`} key={comment._id}>
                      <Card sx={{ my: 1 }}>
                        <CardContent key={comment._id}>
                          <Linkify>{comment.text}</Linkify>
                          <Typography sx={{ fontSize: 14 }}>
                            posted at {comment.createdAt.slice(11, 16)} on{" "}
                            {comment.createdAt.slice(0, 10)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;

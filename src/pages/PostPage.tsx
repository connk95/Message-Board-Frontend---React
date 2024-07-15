import { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Container,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Linkify } from "../utils/utilities";
import { fetchSinglePost } from "../redux/post/post.actions";
import { useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { newComment } from "../redux/post/post.actions";

export const PostPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const posts = useSelector((state: RootState) => state.posts);
  const auth = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comment>();

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    const commentData = {
      text: data.comment,
      postId: id,
    };
    await dispatch(newComment(commentData));
    window.location.reload();
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
  }, [dispatch, id]);

  return (
    <Container component="main" maxWidth="false" sx={{ mt: 12 }}>
      <CssBaseline />
      {posts.loading ? (
        <Box sx={{ mt: "19%", ml: "47%" }}>
          <CircularProgress />
        </Box>
      ) : posts.singlePost.title ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                    {posts.singlePost.title}
                  </Typography>
                  <Linkify sx={{ my: 1 }}>{posts.singlePost.text}</Linkify>
                  <Typography sx={{ fontSize: 14 }}>
                    posted at {posts.singlePost.createdAt.slice(11, 16)} on{" "}
                    {posts.singlePost.createdAt.slice(0, 10)}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    by {posts.singlePost.user.username}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {posts.singlePost.comments.length > 0 ? (
              <Grid item xs={12}>
                <Typography sx={{ ml: 1, mb: 2 }}>
                  Comments: {`${posts.singlePost.comments.length}`}
                </Typography>
                {posts.singlePost.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                    <Card key={comment._id} sx={{ my: 1 }}>
                      <CardContent key={comment.id}>
                        <Linkify sx={{ mb: 1 }}>{comment.text}</Linkify>
                        <Typography sx={{ fontSize: 14 }}>
                          posted at {comment.createdAt.slice(11, 16)} on{" "}
                          {comment.createdAt.slice(0, 10)}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          by {comment.user.username}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Grid>
            ) : (
              <Typography sx={{ m: 2, ml: 3 }}>
                Be the first to leave a comment!
              </Typography>
            )}
            {auth.loggedInUser.access_token ? (
              <Grid item xs={12}>
                <TextField
                  {...register("comment", {
                    required: "Please add a comment and try again",
                    maxLength: {
                      value: 240,
                      message:
                        "Comments cannot exceed 240 characters in length",
                    },
                  })}
                  id="comment"
                  label="Comment"
                  variant="outlined"
                  fullWidth
                />
                {errors.comment && (
                  <Typography variant="caption" color="error">
                    {errors.comment.message}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 10 }}
                >
                  Submit
                </Button>
                <Button
                  href="/home"
                  variant="contained"
                  sx={{ width: 90, mt: 2, mb: 10, ml: 2 }}
                >
                  Back
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      ) : (
        <Typography>Post not found</Typography>
      )}
    </Container>
  );
};

export default PostPage;

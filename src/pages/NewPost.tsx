import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Post } from "../redux/post/post.type";
import { newPost } from "../redux/post/post.actions";

export const NewPost = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state: RootState) => state.posts);
  const auth = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = async (data) => {
    await dispatch(newPost(data));
    navigate("/home");
  };

  return (
    <Container component="main" maxWidth="false" sx={{ mt: 12 }}>
      <CssBaseline />
      {posts.loading ? (
        <Box sx={{ ml: "46%" }}>
          <CircularProgress />
        </Box>
      ) : auth.loggedInUser.access_token ? (
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
              <TextField
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                })}
                id="title"
                label="Title"
                name="title"
                variant="outlined"
                required
                fullWidth
                autoFocus
              />
              {errors.title && (
                <Typography variant="caption" color="error">
                  {errors.title.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("text", {
                  required: "Post body is required",
                  maxLength: {
                    value: 240,
                    message: "Posts cannot exceed 240 characters in length",
                  },
                })}
                id="text"
                label="Post text"
                name="text"
                multiline
                required
                fullWidth
                rows={4}
              />
              {errors.text && (
                <Typography variant="caption" color="error">
                  {errors.text.message}
                </Typography>
              )}
              {/* </Grid> */}
              {/* <Grid item xs={2}> */}
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
          </Grid>
        </Box>
      ) : (
        <Typography>Please sign in to make a post.</Typography>
      )}
    </Container>
  );
};

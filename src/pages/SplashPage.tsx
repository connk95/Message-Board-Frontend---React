import { Typography, Button, Container, Box } from "@mui/material";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Img1 from "../../assets/Collab-pana.svg";
import Img2 from "../../assets/Group discussion-pana.svg";
import Img3 from "../../assets/Conversation-pana.svg";
import Img4 from "../../assets/People talking-pana.svg";
import Img5 from "../../assets/Solidarity-pana.svg";

const images = [Img1, Img2, Img3, Img4, Img5];

export const SplashPage = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomNumber);
  };
  useEffect(() => changeImage(), []);

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "center",
        flexWrap: "wrap",
        width: "100vw",
        height: "100vh",
        background: "#a5bf7c",
        margin: "0",
        padding: "0",
      }}
    >
      <Box
        component="img"
        sx={{ width: "70vw" }}
        src={images[currentImageIndex]}
      ></Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {auth.loggedInUser.access_token ? (
          <>
            <Button variant="contained" href="/home" sx={{ width: 240, mt: 2 }}>
              Home
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ color: "white", fontSize: 20 }}>
              Join ChatBox today.
            </Typography>
            <Button
              variant="contained"
              href="/signup"
              sx={{ width: 240, mt: 2 }}
            >
              Create Account
            </Button>
            <Typography sx={{ color: "white", mt: 2, fontSize: 20 }}>
              Already have an account?
            </Typography>
            <Button
              variant="contained"
              href="/login"
              sx={{ width: 240, mt: 2 }}
            >
              Login
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default SplashPage;

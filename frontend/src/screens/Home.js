import React, { useEffect, useState } from "react";
import { Box, Button, Container, Fade, Modal, Typography } from "@mui/material";
import Background from "../Assets/images/bg3.jpg";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeBtn, setActiveBtn] = useState("login");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const handleLogin = () => {
    setActiveBtn("login");
  };

  const handleSignup = () => {
    setActiveBtn("signup");
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (user) {
      navigate("/chat");
    }
  }, [navigate, user]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 10px",
        minHeight: "100vh",
        backgroundImage: `url(${Background})`,

        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Typography color="white" variant="h5" sx={{ minWidth: "100%" }}>
        Let's Chat 🔊
      </Typography>
      <Box display="flex" gap={10}>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            minWidth: "150px",
            background: activeBtn === "login" ? "white" : "transparent",
            color: activeBtn === "login" ? "black" : "white",
            border: activeBtn === "login" ? "" : "1px solid white",
            "&:hover": {
              background: activeBtn === "login" ? "white" : "transparent",
              color: activeBtn === "login" ? "black" : "white",
              border: activeBtn === "login" ? "" : "1px solid white",
            },
          }}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{
            minWidth: "150px",
            background: activeBtn === "signup" ? "white" : "transparent",
            color: activeBtn === "signup" ? "black" : "white",
            border: activeBtn === "signup" ? "" : "1px solid white",
            "&:hover": {
              background: activeBtn === "signup" ? "white" : "transparent",
              color: activeBtn === "signup" ? "black" : "white",
              border: activeBtn === "signup" ? "" : "1px solid white",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Box>{activeBtn === "login" ? <Login /> : <SignUp s />}</Box>
    </Container>
  );
};

export default Home;

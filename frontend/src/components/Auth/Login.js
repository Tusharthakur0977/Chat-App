import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const LoginUser = async () => {
    if (!loginDetails.email || !loginDetails.password) {
      alert("please enter credentials");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email: loginDetails.email, password: loginDetails.password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chat");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px 40px",
          minHeight: "300px",
          minWidth: "400px",
          backdropFilter: " blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.5)",
        }}
        elevation={6}
      >
        <Typography
          sx={{
            gridColumn: "1",
            gridRow: "1",
            textAlign: "center",
            color: "white",
          }}
        >
          HI USER LOGIN HERE!
        </Typography>

        <TextField
          sx={{
            gridColumn: "1",
            gridRow: "2",
          }}
          type={"email"}
          label="Email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          size="small"
          placeholder="enter Email address"
          inputProps={{
            style: {
              color: "#c1c1c1",
            },
          }}
          InputLabelProps={{
            style: {
              color: "#c1c1c1",
            },
          }}
        />
        <TextField
          sx={{ gridColumn: "1", gridRow: "3" }}
          type={"password"}
          label="Password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          size="small"
          placeholder="enter Password"
          inputProps={{
            style: {
              color: "#c1c1c1",
            },
          }}
          InputLabelProps={{
            style: {
              color: "#c1c1c1",
            },
          }}
        />
        <Button
          sx={{ gridColumn: "1", gridRow: "4" }}
          variant="contained"
          size="small"
          type="submit"
          onClick={LoginUser}
        >
          LOG IN
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });

  const handleChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  };

  const Register = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:7000/api/user",
      data: {
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
        pic: userDetail.pic,
      },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register();
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
          display: "grid",
          gap: "20px",
          minHeight: "300px",
          minWidth: "400px",
          backdropFilter: " blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.5)",
          padding: "20px 40px",
          borderRadius: "10px",
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
          mb="20px"
        >
          HI USER Sign Up HERE!
        </Typography>
        <TextField
          name="name"
          value={userDetail.name}
          onChange={handleChange}
          sx={{ gridColumn: "1", gridRow: "2" }}
          type={"name"}
          label="Name"
          size="small"
          placeholder="Enter Name"
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
          name="email"
          value={userDetail.email}
          onChange={handleChange}
          sx={{ gridColumn: "1", gridRow: "3" }}
          type={"email"}
          label="Email"
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
          name="password"
          value={userDetail.password}
          onChange={handleChange}
          sx={{ gridColumn: "1", gridRow: "4" }}
          type={"password"}
          label="Password"
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
        <TextField
          name="pic"
          value={userDetail.pic}
          onChange={handleChange}
          sx={{ gridColumn: "1", gridRow: "5" }}
          type={"file"}
          size="small"
        />
        <Button
          sx={{ gridColumn: "1", gridRow: "6" }}
          variant="contained"
          size="small"
          type="submit"
          onClick={handleSubmit}
        >
          SIGN UP
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUp;

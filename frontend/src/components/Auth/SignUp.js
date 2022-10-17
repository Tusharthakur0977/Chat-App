import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SuccessIcon from "../../Assets/images/successIcon.png";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const SignUp = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const [tooltip, setTooltip] = useState(true);
  const closeTooltip = () => {
    setTooltip(false);
  };

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    pic: null,
  });
  const [error, setError] = useState({});
  let FormValid = true;

  const handleChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  };

  const validateSignUp = (userDetail) => {
    const errors = {};
    var Emailregex = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    var PasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!userDetail.name) {
      errors.Name = "Please Enter Name";
    } else if (userDetail.name.length > 20) {
      errors.Name = "Name cannot exceed 20 characters";
    }

    if (!userDetail.email) {
      errors.EmailId = "Please Enter Email ID";
    } else if (!Emailregex.test(userDetail.email)) {
      errors.EmailId = "PLease enter a Valid email address";
    }

    if (!userDetail.password) {
      errors.password = "Please Enter Password";
    } else if (!PasswordRegex.test(userDetail.password)) {
      errors.password = "Please Enter a Strong Password";
    }
    if (userDetail.pic === null) {
      errors.pic = "Please Selece a Profile Pic";
    }
    if (JSON.stringify(errors.length > 1)) {
      setError(errors);
    }
    return FormValid;
  };

  const Register = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:7000/api/user",
      data: {
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
        pic: userDetail.pic.name,
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
    // console.log(userDetail.pic.name.length);
    e.preventDefault();
    validateSignUp(userDetail);
    console.log("ERROR STATE", error);
    if (!FormValid) {
      alert("ERROR");
    } else {
      alert("SUCCESS");
      // Register();
      // setOpenModal(true);
      // setTimeout(() => {
      //   navigate("login");
      //   setOpenModal(false);
      // }, 2000);
    }
  };

  const SuccessModal = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 270,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Typography
              style={{
                fontSize: 20,
                padding: "10px 10px",
                fontWeight: "bolder",
              }}
            >
              Success!
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                textAlign: "center",
                letterSpacing: 1,
                padding: "10px 10px",
              }}
            >
              Your account has been created successfully
            </Typography>
            <Avatar
              src={SuccessIcon}
              variant="circular"
              sx={{ padding: 3, width: 100, height: 100 }}
            />
            <Button
              onClick={() => navigate("login")}
              centerRipple={false}
              sx={{
                marginTop: "20px",
                background: "#00A36C",
                color: "white",
                width: "250px",
                borderRadius: 20,
              }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {<SuccessModal />}

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
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userDetail.pic ? (
            <>
              <Avatar
                alt="not found"
                src={URL.createObjectURL(userDetail.pic)}
                sx={{ width: 70, height: 70 }}
              />
              <Button size="small" onClick={() => setUserDetail({ pic: null })}>
                Remove
              </Button>
            </>
          ) : (
            <ClickAwayListener onClickAway={closeTooltip}>
              <Tooltip
                title="Upload Photo"
                placement="right"
                arrow
                open={tooltip}
              >
                <IconButton
                  size="large"
                  sx={{ boxShadow: "0px 0px 2px 1px whitesmoke" }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    type="file"
                    name="pic"
                    onChange={(event) => {
                      setUserDetail({
                        ...userDetail,
                        [event.target.name]: event.target.files[0],
                      });
                    }}
                  />
                  <AddAPhotoIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          )}
        </Box>
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
          helperText={error.Name ? error.Name : ""}
          error={error.Name ? true : false}
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
          helperText={error.EmailId ? error.EmailId : ""}
          error={error.EmailId ? true : false}
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
          helperText={error.password ? error.password : ""}
          error={error.password ? true : false}
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
        {/* <TextField
          name="pic"
          value={userDetail.pic}
          onChange={handleChange}
          sx={{ display: "none" }}
          type="file"
          size="small"
        /> */}
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

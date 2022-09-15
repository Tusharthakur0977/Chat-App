import {
  Avatar,
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { ChatState } from "../../Context/ChatContext";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const ProfileModal = ({ openModal, handleCloseModal }) => {
  const { user } = ChatState();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <IconButton
              sx={{ top: 0, right: 0, position: "absolute" }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ color: "#383838" }}
              textAlign="center"
              gutterBottom
              variant="h5"
            >
              {user?.name}
            </Typography>
            <Avatar
              alt={user?.name}
              sx={{ margin: "10px 0", width: 100, height: 100 }}
              src={user?.pic}
            />
            <Typography
              gutterBottom
              variant="body1"
              sx={{ width: "100%" }}
              color="text.secondary"
            >
              Email:
            </Typography>
            <Typography variant="h6" sx={{ width: "100%" }}>
              {user?.email}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProfileModal;

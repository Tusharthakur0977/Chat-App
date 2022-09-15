import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const UserListItem = ({ users, handleFunction }) => {
  // const randomHsl = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
  return (
    <Box
      boxShadow={3}
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        padding: "5px",
        cursor: "pointer",
        background: " lightgrey",
        // transform: "all 5s ease",
        "&:hover": {
          background: "#38B2AC",
          color: "white",
        },
      }}
      onClick={handleFunction}
    >
      <Avatar
        sx={{
          cursor: "pointer",
          marginRight: 2,
        }}
        size="sm"
        name={users.name}
        src={users.pic}
      />
      <Box>
        <Typography>{users.name}</Typography>
        <Typography>
          <b>Email : </b>
          {users.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;

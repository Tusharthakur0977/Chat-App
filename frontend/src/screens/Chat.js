import { Box, Container } from "@mui/material";
import React from "react";
import ChatBox from "../components/ChatUi/ChatBox";
import MyChats from "../components/ChatUi/MyChats";
import SideDrawer from "../components/ChatUi/SideDrawer";
import { ChatState } from "../Context/ChatContext";

const Chat = () => {
  const { user, chats } = ChatState();
  console.log(chats);
  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <SideDrawer />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </Container>
    </>
  );
};

export default Chat;

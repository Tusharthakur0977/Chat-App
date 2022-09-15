import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { ChatState } from "../../Context/ChatContext";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import chatBg from "../../Assets/images/chatbg.jpg";

const MyChats = () => {
  const [loggedUSer, setLoggedUSer] = useState();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("api/chat", config);

      console.log(data);
      setChats(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const getSender = (loggedUSer, users) => {
    return users[0]._id === loggedUSer._id ? users[1].name : users[0].name;
  };

  useEffect(() => {
    setLoggedUSer(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          minWidth: "35%",
          minHeight: "89vh",
          flexDirection: "column",
          backgroundImage: `url(${chatBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "white" }} variant="body1" fontWeight="bold">
            My Chats
          </Typography>
          <Button
            variant="outlined"
            sx={{
              background: "transparent",
              color: "white",
              border: "1px solid #c1c1c1",
            }}
            size="small"
          >
            + Group Chat
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {chats ? (
            <Stack sx={{}}>
              {chats.map((chat) => (
                <Box
                  sx={{
                    margin: "5px 10px",
                    cursor: "pointer",
                    padding: "10px 20px",
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(17, 25, 40, 0.75)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                  }}
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Typography sx={{ color: "#c1c1c1" }}>
                    {!chat.isGroupChat
                      ? getSender(loggedUSer, chat.users)
                      : chat.chatName}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default MyChats;

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../../Context/ChatContext";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserUI/UserListItem";
import ErrorIcon from "@mui/icons-material/Error";

const SideDrawer = () => {
  const navigate = useNavigate();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const [search, setSearch] = useState("");
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const [searched, setSearched] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [isChat, setIsChat] = useState(null);

  //Drwaer
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const handleDrawer = () => [setisDrawerOpen(true)];
  const hadnleDrwaerClose = () => {
    setisDrawerOpen(false);
    setSearch("");
    setSearched([]);
  };

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // accMEnu functions
  const [accMenu, setAccMenu] = useState(null);
  const open = Boolean(accMenu);
  const handleAccMenu = (event) => {
    setAccMenu(event.currentTarget);
  };
  const handleCloseAccMenu = () => {
    setAccMenu(null);
  };

  // Notification Bell functions
  const [notifMenu, setNotifMenu] = useState(null);
  const openNotifictaion = Boolean(notifMenu);
  const handleNotifMenu = (event) => {
    setNotifMenu(event.currentTarget);
  };
  const handleCloseNotifMenu = () => {
    setNotifMenu(null);
  };

  //Logout function
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // Searching User data Function
  const handleSearch = async () => {
    if (search.length < 1) {
      alert("please enter user Name to Search");
      return;
    }
    try {
      setLoading(true);
      // sending jwt data for protected patH
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      //Axios request to get user
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearched(data);
      if (data.length > 0) {
        setIsChat(true);
      } else {
        setIsChat(false);
      }
    } catch (err) {
      alert("Failed to load searched Data");
    }
  };

  const accessChat = async (userId) => {
    setLoadingChat(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("api/chat", { userId }, config);
      
      // if chat is alreasdy created
      if (!chats.find((c) => c.id === data.id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      hadnleDrwaerClose();
    } catch (err) {
      alert("Error Fetching the Data");
    }
  };

  return (
    <>
      <Box
        boxShadow={7}
        sx={{
          padding: "5px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#393939",
        }}
      >
        <Tooltip title="Search Users to chat" placement="bottom-end">
          <Button
            sx={{ borderColor: "white", color: "white" }}
            onClick={handleDrawer}
          >
            <SearchIcon sx={{ fontSize: "20px", mr: 1 }} />
            <Typography>Search</Typography>
          </Button>
        </Tooltip>
        <Typography
          sx={{ color: "white" }}
          fontSize="20px"
          fontFamily="Work sans"
        >
          Let's Chat
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tooltip title="Notification">
            <IconButton
              onClick={handleNotifMenu}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <NotificationsIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleAccMenu}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                alt={user?.name}
                src={user?.pic}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={accMenu}
        id="account-menu"
        open={open}
        onClose={handleCloseAccMenu}
        onClick={handleCloseAccMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleOpenModal} sx={{ fontSize: "12px" }}>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler} sx={{ fontSize: "12px" }}>
          Log Out
        </MenuItem>
      </Menu>
      <ProfileModal openModal={openModal} handleCloseModal={handleCloseModal} />

      <Drawer
        elevation={10}
        anchor="left"
        open={isDrawerOpen}
        onClose={hadnleDrwaerClose}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
          }}
        >
          <Box
            sx={{
              background: "#4d4d4d",
              display: "flex",
              alignItems: "center",
              padding: "0 0 0 10px",
            }}
          >
            <Typography
              sx={{
                flex: 1,
                color: "white",
                padding: "5px 0",
              }}
            >
              Search Users
            </Typography>
            <IconButton onClick={hadnleDrwaerClose}>
              <CloseIcon sx={{ fontSize: "30px", color: "white" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px 10px",
            }}
          >
            <TextField
              onKeyDown={handleKeypress}
              type="text"
              size="small"
              fullWidth
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value.length === 0) {
                  setSearched([]);
                  setIsChat(null);
                }
              }}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          <Divider />

          {loading ? (
            <Box
              sx={{
                margin: "10px 0",
                padding: "0 10px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <ChatLoading />
            </Box>
          ) : isChat === null ? (
            search.length < 1 ? (
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <SearchIcon />
                <Typography>Enter Word To Search</Typography>
              </Box>
            ) : null
          ) : (
            <Box sx={{ padding: "10px 5px" }}>
              {isChat ? (
                searched?.map((users) => {
                  return (
                    <UserListItem
                      key={users._id}
                      users={users}
                      handleFunction={() => accessChat(users._id)}
                    />
                  );
                })
              ) : (
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ErrorIcon />
                  <Typography>No Match Found</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;

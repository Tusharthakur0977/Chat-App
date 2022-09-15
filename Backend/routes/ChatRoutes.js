const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/ChatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats); //  get All Chats
router.post("/group", protect, createGroupChat); // Create Group Chat
router.put("/rename", protect, renameGroup); // Rename Group Chat
router.put("/groupadd", protect, addToGroup); // Add To Group Chat
router.put("/groupremove", protect, removeFromGroup); // remove from Group Chat

module.exports = router;

const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      required: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isLatestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    isGroupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);

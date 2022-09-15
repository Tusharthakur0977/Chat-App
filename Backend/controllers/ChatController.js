const { remove } = require("../models/ChatModel");
const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");

// controller for creating or frtching one on one chat
exports.accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserID param not sent with Request");
    return res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false, //hence it is a one on one chat groupchat should be false
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, //logged in user
      { users: { $elemMatch: { $eq: userId } } }, // user with the ID provided
    ],
  })
    .populate("users", "-password") // populating user Data except password
    .populate("isLatestMessage"); //

  isChat = await User.populate(isChat, {
    path: "isLatestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    //creting NEw Chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      // sending full chat in response
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-passwrod"
      );
      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
};

// method for fetching all chats of a Single USer
exports.fetchChats = async (req, res) => {
  try {
    //matching logged in user id with all the ids in users array of chat
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("isLatestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "isLatestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

//method for crerating group Chat
exports.createGroupChat = async (req, res) => {
  //checking for details entered by user
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "PLease Fill all Details" });
  }
  // converting array of users coming from frontend
  var users = JSON.parse(JSON.stringify(req.body.users));
  console.log(users);

  // check for not having more than 2 user
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  // if usera are more than 2
  users.push(req.user);
  try {
    //creating Group Chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      isGroupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId, // taking Chat id
    {
      chatName, // updating New NAme
    },
    {
      new: true, // retur nupdated value
    }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw newError("Chat not found");
  } else {
    res.json(updatedChat);
  }
};

exports.addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};

exports.removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");
  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

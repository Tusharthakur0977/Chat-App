const User = require("../models/UserModel");
const generateToken = require("../utility/JWTtoken");

exports.createuser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("please Enter all Details");
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400);
      throw new Error("User Aleready exist");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password", 401);
    }

    const isPasswordMatched = await user.comparepassword(password);

    if (!isPasswordMatched) {
      // res.status(401).json({
      //   success: false,
      // });
      throw new Error("Invalid email or password", 401);
    }
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

// controller for getting all users except the logged one using searching
exports.allUsers = async (req, res) => {
  try {
    const keyword = req.query
      ? {
          // checkiong if the keyword exist if yes then using mongodb regex fnctn to saerch
          $or: [
            // or fnct if either of two is true
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    //finding all users acc to search keyword except for the loggedin one
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

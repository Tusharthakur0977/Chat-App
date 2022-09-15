// middleware for authorizing logged in user and provide jwt token

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.protect = async (req, res, next) => {
  let token;
  if (
    // checking for token in headers of api
    req.headers.authorization &&
    // checking for bearer token
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // removing bearer from token
      token = req.headers.authorization.split(" ")[1];

      // decoding token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // finding user and returning without password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

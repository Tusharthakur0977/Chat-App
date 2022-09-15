const express = require("express");
const {
  createuser,
  loginuser,
  allUsers,
} = require("../controllers/UserController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createuser);
router.get("/", protect, allUsers);
router.post("/login", loginuser);

module.exports = router;

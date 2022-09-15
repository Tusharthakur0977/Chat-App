const express = require("express");
const cors = require("cors");
const { notfound, errorHandling } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/UserRoutes");
const chatRoutes = require("./routes/ChatRoutes");
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Error Handling for Wrong Requests
app.use(notfound);
app.use(errorHandling);

module.exports = app;

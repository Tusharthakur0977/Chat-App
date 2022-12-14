const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.DB_URI).then((data) => {
      console.log(
        `MongoDB connected with server successfully at ${data.connection.host}`
      );
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDatabase;

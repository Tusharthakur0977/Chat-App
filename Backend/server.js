const app = require("./app");
const connectDatabase = require("./config/db");
// ENV port
require("dotenv").config({ path: "backend/config/.env" });
const port = process.env.PORT

connectDatabase()


const server = app.listen(port, () => {
  console.log(`server running at "http://localhost/${port}" `);
});

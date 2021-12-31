const { config } = require("dotenv");

config();

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

module.exports = {
  DB_URI: DB_URI || "mongodb://localhost:27017/ApiRestJWT-DB",
  PORT: PORT || 3000,
  SECRET: SECRET || "products-api",
};

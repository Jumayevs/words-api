const dotenv = require("dotenv");
dotenv.config({ path: ".env.*" });

const { PORT, DB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
module.exports = { PORT, DB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };

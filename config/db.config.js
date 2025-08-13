const { default: mongoose } = require("mongoose");
const { DB_URL } = require("./env");
const logger = require("../service/logger.service");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger("Database connection successfull");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connectDB;

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const connectDB = require("./config/db.config");
const logger = require("./service/logger.service");

// app init
const app = express();

// middlewares
app.use(express.json());
app.use(fileUpload());
app.use(express.static("static"));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/dict", require("./routes/dict.route"));
app.use("/api/v1/branch", require("./routes/branch.route"));
app.use("/api/v1/category", require("./routes/category.route"));
app.use("/api/v1/word", require("./routes/word.route"));

// error middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8000;


// start the application
const start = async () => {
  await connectDB();
  app.listen(PORT, () => logger(`App is live on http://localhost:${PORT}`));
};

start();


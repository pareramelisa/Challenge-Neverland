require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking")
const branchRouter = require("./routes/branch")
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/user", userRouter);
server.use("/booking", bookingRouter);
server.use("/branch", branchRouter);

module.exports = server;

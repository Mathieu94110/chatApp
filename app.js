const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");

const server = app.listen(process.env.PORT);
module.exports = {
  server,
  app,
};

app.use(cookieParser());
require("./config/jwt.config");
require("./config/socket.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

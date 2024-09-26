const express = require("express");
const app = express();
const { authAdmin, userAuth } = require("./middlewares/adminMiddleware");

app.use("/admin", authAdmin, (req, res) => {
  res.send("hello from admin");
});

app.use("/user", (req, res, next) => {
  next();
  // res.send("hello from user");
});
app.use("/user/profile", (req, res, next) => {
  next();
  // res.send("hello from user profile");
});
app.use("/user/profile/2", (req, res) => {
  res.send("hello from user profile 2");
});

app.use("/admin/getUserData", (req, res) => {
  res.send("Get all data ");
});
app.use("/admin/deleteUsers", (req, res) => {
  res.send("user Deleted ");
});

app.listen(3000);

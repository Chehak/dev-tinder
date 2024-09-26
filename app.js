const express = require("express");
const app = express();
const { authAdmin, userAuth } = require("./middlewares/adminMiddleware");

app.use("/admin", authAdmin, (req, res) => {
  res.send("hello from admin");
});

app.use("/user/login", (req, res) => {
  res.send("User login api");
});

app.use("/user", userAuth, (req, res, next) => {
  res.send("hello from user api");
});

app.listen(3000);

// We create middlewares because we can do exceptional of things , we can handle so many corner cases with it
//We can make our code look good and cleaner , so suppose if i had to check for authorization for each route handler ,
//then obviously we can't write duplicate code everywhere instead we will create middleware for it and use it whereever we want
//We can customized lots of things using middlewares
//if suppose i had created multiple route for login and i dont want to authenticate my user/login route then what i can do
// is to just add the userAuth to the /user route and make the /user/login to the top so that it dont have to
//go through the user route simple

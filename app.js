const express = require("express");
const app = express();
const { authAdmin, userAuth } = require("./middlewares/adminMiddleware");

app.use("/admin", authAdmin, (req, res) => {
  res.send("hello from admin");
});

app.use("/user/login", (req, res) => {
  res.send("User login api");
});

// error is not there on first then it will not run

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

//another one is we can use try catch so that, is is the best practice of handling errors , generally try catch is used
//errors are handled within the route
app.use("/user", (req, res, next) => {
  // throw new Error("jjhjhjhjj");
  // res.send("hello from user api");
  try {
    throw new Error("jjhjhjhjj");
    res.send("hello from user api");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//one method of error handling is that we can add a wildcard route so that if any of the route has some error
//then this route will call and handles error efficiently

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000);

// We create middlewares because we can do exceptional of things , we can handle so many corner cases with it
//We can make our code look good and cleaner , so suppose if i had to check for authorization for each route handler ,
//then obviously we can't write duplicate code everywhere instead we will create middleware for it and use it whereever we want
//We can customized lots of things using middlewares
//if suppose i had created multiple route for login and i dont want to authenticate my user/login route then what i can do
// is to just add the userAuth to the /user route and make the /user/login to the top so that it dont have to
//go through the user route simple

//ORDER OF ROUTES MATTERS A LOT !!!

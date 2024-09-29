const express = require("express");
const app = express();
const User = require("./schemas/UserSchema");
const { mongoose } = require("mongoose");
const connectDB = require("./config/database");

app.post("/signup", async (req, res) => {
  try {
    //Creating a nee instance of the user modal and passed data into it ,
    //  when i saved then the new document is added to the databse
    const user = new User({
      firstName: "Chehak",
      lastName: "Gupta",
      gender: "female",
      email: "gchehak18@gmail.com",
      age: -24,
      password: "123456",
    });
    await user.save();
    res.send("User added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is listening to port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// We create middlewares because we can do exceptional of things , we can handle so many corner cases with it
//We can make our code look good and cleaner , so suppose if i had to check for authorization for each route handler ,
//then obviously we can't write duplicate code everywhere instead we will create middleware for it and use it whereever we want
//We can customized lots of things using middlewares
//if suppose i had created multiple route for login and i dont want to authenticate my user/login route then what i can do
// is to just add the userAuth to the /user route and make the /user/login to the top so that it dont have to
//go through the user route simple

//ORDER OF ROUTES MATTERS A LOT !!!

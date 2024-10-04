const express = require("express");
const app = express();
const User = require("./modals/user");
const { mongoose } = require("mongoose");
const connectDB = require("./config/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //Creating a nee instance of the user modal and passed data into it ,
    //  when i saved then the new document is added to the databse
    const user = new User(req.body);
    await user.save();
    res.send("User added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  try {
    const user = await User.find({ email: emailId });
    if (!user) res.status(400).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
});

app.get("/userById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server error");
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
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

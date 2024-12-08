const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials:true
  })
)

app.use(express.json());
app.use(cookieParser())

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRoute = require('./routes/request');
const userRoute = require('./routes/user')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRoute);
app.use('/', userRoute);


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

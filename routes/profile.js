const express = require('express');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateProfileData } = require('../utils/validation')

const { userAuth } = require('../middlewares/adminMiddleware')

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.json({message:"Profile fetched",data:user})
    }
  } catch (err) {
    res.status(500).send("Internal server error" + err)

  }
})


profileRouter.post('/profile/password', userAuth, async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    if (!user) throw new Error("Please Login ")
    const bcryptPass = await user.bcryptPass(body.oldPassword, req.user.password);
    if (!bcryptPass) throw new Error("Old password is wrong")
    if (body.newPassword != body.verifyNewPassword) throw new Error("Password does'nt match");
    const newPassword = await bcrypt.hash(body.newPassword, 10);
    user['password'] = newPassword;
    user.save();
    res.send("Updated")
  } catch (err) {
    res.status(500).send("internal server error" + err)
  }

})


profileRouter.post('/profile/edit', userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) { throw new Error("profile data is not valid") }
    const loggedInUser = req.user;
    console.log(loggedInUser, "loggedInUser");

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });

  } catch (err) {
    res.status(500).send("internal server error" + err)
  }

})

module.exports = profileRouter
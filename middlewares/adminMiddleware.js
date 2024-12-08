const User = require("../modals/user");
const jwt = require('jsonwebtoken');


const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not valid !!");

    const decodedMessage = await jwt.verify(token, "I@AM##POSSIBLE$!1999");
    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("No user found")
    }
    else {
      req.user = user
      next()
    }

  } catch (err) {
    res.status(500).send("Internal Server error" + err.message)
  }

};

module.exports = {
  userAuth,
};

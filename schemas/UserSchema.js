const { mongoose, mongo } = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

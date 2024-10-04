const { mongoose, mongo } = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 4,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  skills: {
    type: [String],
  },
  photoUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
  },
  about: {
    type: String,
    default: "This is a default about",
  },
});

module.exports = mongoose.model("User", UserSchema);

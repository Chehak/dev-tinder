const { mongoose } = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid email id");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password");
        }
        // validate(value) {
        //   if (!["male", "female", "others"].includes(value)) {
        //     throw new Error("Gender data is not valid");
        //   }
        // },
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "is not supported",
      },
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo Url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

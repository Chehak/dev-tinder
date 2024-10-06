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
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    skills: {
      type: [String],
      required: true,
      validate: [
        {
          validator: function (arr) {
            // Check if the array length is greater than 6
            return arr.length <= 6;
          },
          message: "Length of the skills array must not be greater than 6.",
        },
        {
          validator: function (arr) {
            // Check if every skill in the array has a length less than 15
            return arr.every((skill) => skill.length < 15);
          },
          message: "Each skill must be less than 15 characters.",
        },
        {
          validator: function (arr) {
            return arr.length == new Set(arr).size;
          },
          message: "Skills must not contain any duplicates ",
        },
      ],
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
      validate: {
        validator: function (str) {
          return str.length <= 100;
        },
        message: "Length must not be greater than 100",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

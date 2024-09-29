const { mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gchehak18:2gUGLo0fb8zlh4ut@cluster0.xfhqjeh.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

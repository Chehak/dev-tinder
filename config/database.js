const { mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gchehak18:MLj2yvDYuMMWtSCe@cluster0.xfhqjeh.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

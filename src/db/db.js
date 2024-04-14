const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://teamerror406:VleMukzxSXMJ8bBh@cluster0.ducp9wj.mongodb.net/Test`,
      {
        useNewUrlParser: true,
      }
    );
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.error("Error", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
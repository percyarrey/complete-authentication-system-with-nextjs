import mongoose from "mongoose";
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

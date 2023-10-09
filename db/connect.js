import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/");

    console.log("Success");
  } catch (error) {
    console.log("failed");
  }
};
export default connectDB;

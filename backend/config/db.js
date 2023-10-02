import mongoose from "mongoose";

//mongoose.connect returns a promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:  ${error}`);
    process.exit(1);
  }
};

export default connectDB;

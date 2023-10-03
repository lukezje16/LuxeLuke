//make sure imports have js at the end or this doesnt work
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

//this is for seeding dummy data into the database

const importData = async () => {
  try {
    //delete the data first
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    //insert users file
    const createdUsers = await User.insertMany(users);
    //get the admin user
    const adminUser = createdUsers[0]._id;
    //store products in sample products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    //insert Products
    await Product.insertMany(sampleProducts);
    console.log("data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //delete the data first
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroyed".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

//if you run the file with the argument of -d then the script will
//run the destroy data function but if you run it with no arg then
//import data will be run
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

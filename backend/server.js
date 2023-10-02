import express from "express";
import dotenv from "dotenv";
//GET ACCESS TO THE ENV VARIABLES
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
//connect to mongo DB
connectDB();

//Using process to get access to the port
const port = process.env.PORT || 5000;

//initialising the express server
const app = express();

app.get("/", (req, res) => {
  res.send("api is running");
});

//all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

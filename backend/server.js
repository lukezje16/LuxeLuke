import path from "path";
import express from "express";
import dotenv from "dotenv";
//GET ACCESS TO THE ENV VARIABLES
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
//import middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

//connect to mongo DB
connectDB();

//Using process to get access to the port
const port = process.env.PORT || 5000;

//initialising the express server
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middle ware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api is running");
});

//whenever we hit this route it will read from this file
app.use("/api/products", productRoutes);
//whenever we hit user route
app.use("/api/users", userRoutes);
//whenever we hit order route
app.use("/api/orders", orderRoutes);
//whenever we hit upload route
app.use("/api/upload", uploadRoutes);

//PAYPAL
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); //set dirname to current directory
//making the uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

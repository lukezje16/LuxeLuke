import express from "express";
import dotenv from "dotenv";
//GET ACCESS TO THE ENV VARIABLES
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//import middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//connect to mongo DB
connectDB();

//Using process to get access to the port
const port = process.env.PORT || 5000;

//initialising the express server
const app = express();

app.get("/", (req, res) => {
  res.send("api is running");
});

//whenever we hit this route it will read from this file
app.use("/api/products", productRoutes);
//whenever we hit user route
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

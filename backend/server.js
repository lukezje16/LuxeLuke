import express from "express";
import products from "./data/products.js";

const port = 5000;

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

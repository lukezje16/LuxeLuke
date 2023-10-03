import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();

//get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    //products found so return the products
    if (products) {
      return res.json(products);
    } else {
      //producs not valid return the error
      res.status(404);
      throw new Error("Products not found");
    }
  })
);

//single product
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    //use ID from url to find product
    const product = await Product.findById(req.params.id);
    //product is valid so return product
    if (product) {
      return res.json(product);
    } else {
      //product not valid return the error
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;

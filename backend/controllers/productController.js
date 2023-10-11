import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@description Fetches all products
//@route Get /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //products found so return the products
  if (products) {
    return res.json(products);
  } else {
    //products not valid return the error
    res.status(404);
    throw new Error("Products not found");
  }
});

//@description Fetches product by id
//@route Get /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
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
});

//@description Create a new Product
//@route POST /api/products/:id
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createProduct);
});

//@ update product
//@route PUT /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };

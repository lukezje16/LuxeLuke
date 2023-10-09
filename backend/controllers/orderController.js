import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@description create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

//@description get logged in users orders
//@route Get /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders");
});

//@description get order by id
//@route Get /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send("get order by id");
});

//@description update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("marked as paid");
});

//@description update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("marked as delivered");
});

//@description get all orders
//@route get /api/orders
//@access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  getOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};

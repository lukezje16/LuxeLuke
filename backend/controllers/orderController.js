import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@description create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  //destructure the info from the body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order items");
  } else {
    //create a new order
    const order = new Order({
      //map through the order items and return a new array with the product id
      orderItems: orderItems?.map((item) => ({
        ...item,
        product: item._id,
        id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    //save the order
    const createdOrder = await order.save();
    //send back the created order
    res.status(201).json(createdOrder);
  }
});

//@description get logged in users orders
//@route Get /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  //get all orders from the user
  const orders = await Order.find({ user: req.user._id });
  //send back the orders
  res.status(200).json(orders);
});

//@description get order by id
//@route Get /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@description update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //going to come from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    //save the updated order into the database
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order nopt found");
  }
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
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  getOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};

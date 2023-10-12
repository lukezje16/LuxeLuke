import {
  getOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} from "../controllers/orderController.js";
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//all connected to /api/users already
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyOrders, getOrderDetails, placeOrder } from "../controllers/orders.js";
const router = express.Router();

router.post("/createorder", placeOrder);


router.get("/myorders", isAuthenticated, getMyOrders)
router.get("/order/:id", isAuthenticated, getOrderDetails)

export default router;

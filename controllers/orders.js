import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Orders.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const placeOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = "req.user._id";

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully via Cash On Delivery",
  });
});

export const getMyOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(201).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) return next(new ErrorHandler("Invalid Order Id", 464));
  res.status(201).json({
    success: true,
    order,
  });
});


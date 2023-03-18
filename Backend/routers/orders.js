const router = require("express").Router();
const orderModel = require("../models/order");
const orderItemModel = require("../models/order-item");

router.get("/", async (req, res) => {
  const orderList = await orderModel.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.post("/", async (req, res) => {
  const orderItemId = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new orderItemModel({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemId;

  let order = new orderModel({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!🥲");

  res.send(order);
});
module.exports = router;

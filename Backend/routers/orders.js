const router = require("express").Router();
const orderModel = require("../models/order");

router.get("/", async (req, res) => {
  const orderList = await orderModel.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

module.exports = router;

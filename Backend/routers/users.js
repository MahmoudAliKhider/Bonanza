const router = require("express").Router();
const userModel = require("../models/user");

router.get("/", async (req, res) => {
  const userList = await userModel.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

module.exports = router;

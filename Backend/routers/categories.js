const router = require("express").Router();
const categoryModel = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await categoryModel.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

module.exports = router;

const router = require("express").Router();
const categoryModel = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await categoryModel.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  let category = new categoryModel({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();
  if (!category) {
    res.status(404).send("the category cant by created...");
  }
  res.json(category);
});

router.delete("/:id", (req, res) => {
  categoryModel
    .findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category will de deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found .!!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

const router = require("express").Router();

const productModel = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

//if I need to return a name and image use .select('name image') -_id remove id from data return
router.get("/", async (req, res) => {
  const products = await productModel.find().populate("category");

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid category");

  let product = new productModel({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("the product cant be created");

  res.json(product);
});

router.get("/:id", async (req, res) => {
  //use populate to show data
  const product = await productModel
    .findById(req.params.id)
    .populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Id");
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(500).send("the product cannot be updated!");

  res.send(product);
});

router.delete("/:id", (req, res) => {
  productModel
    .findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await productModel.countDocuments().exec();
  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({ productCount: productCount });
});

router.get("/get/feature", async (req, res) => {
  const products = await productModel.find({isFeatured:true});
  if (!products) {
    res.status(500).json({ success: false });
  }
  res.json(products);
});

module.exports = router;

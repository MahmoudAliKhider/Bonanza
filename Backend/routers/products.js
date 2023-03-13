const router = require("express").Router();
const productModel = require("../models/product");

router.get("/", async (req, res) => {
  const products = await productModel.find();

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.post('/count',(req,res)=>{
    const products = new productModel({
        name : req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    products.save().then((createProduct)=>{
        res.status(200).json(createProduct)
    })
    .catch((err)=>{
       res.status(500).json({success : false})
    })
})

module.exports = router;

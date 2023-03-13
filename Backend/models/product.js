const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    require: true,
    type: Number,
  },
});

module.exports = mongoose.model("products", productSchema);

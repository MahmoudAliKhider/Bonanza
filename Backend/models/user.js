const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    require: true,
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);

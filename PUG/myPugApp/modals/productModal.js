var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
});

var productModule = mongoose.model("Product", productSchema);
module.exports = productModule;

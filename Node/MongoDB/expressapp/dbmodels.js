const mongoose = require("mongoose");

/* const spentAtSchema = mongoose.Schema({
  title: String, //cash spent for
  price: float,
  date: { type: Date, default: Date.now, index: true },
});
 */

const testSchema = mongoose.Schema({
    name:String
});

const testModel = mongoose.model("testModel", testSchema);

module.exports = testModel;

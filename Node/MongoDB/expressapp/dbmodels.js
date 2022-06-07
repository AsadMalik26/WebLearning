const mongoose = require("mongoose");

/* const spentAtSchema = mongoose.Schema({
  title: String, //cash spent for
  price: float,
  date: { type: Date, default: Date.now, index: true },
});
 */

const cashSchema = mongoose.Schema({
    title:String,
    price:float,
    description:{
      type:String, default:null,
    }
});

const cashModel = mongoose.model("cashModel", testSchema);

module.exports = cashModel;

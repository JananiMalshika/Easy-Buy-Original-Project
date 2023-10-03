const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const item = {
  itemID: String,
  itemName: String,
  itemURL: String,
  sellerID:String,
  qty: String,
  price: String,
  category:String
};

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  items: [item],
});

const cart = new mongoose.model("Carts", cartSchema);

module.exports = cart;

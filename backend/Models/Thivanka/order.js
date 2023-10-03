const mongoose = require("mongoose");

const order = {
  sellerId: String,
  productId: String,
  productName: String,
  productPrice: String,
  productQty: String,
  subTotal: String,
  isReviewed: Boolean,
};

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  customerContact: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  product: [order],
});

const Order = new mongoose.model("Orders", orderSchema);

module.exports = Order;

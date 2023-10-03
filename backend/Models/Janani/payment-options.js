const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },

  expireDate: {
    type: String,
    required: true,
  },
});

const PaymentOptions = new mongoose.model("Payment-options", paymentSchema);

module.exports = PaymentOptions;

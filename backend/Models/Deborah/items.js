//to get the database model
const mongoose = require("mongoose");

const rating = new mongoose.Schema({
  Name: String,
  Date: String,
  Review: String,
  Comment: String,
});

//columns, properties of the schema
const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  sellerID: {
    type: String,
    required: true,
  },
  ratings: [rating],
});

module.exports = mongoose.model("Items", itemSchema);

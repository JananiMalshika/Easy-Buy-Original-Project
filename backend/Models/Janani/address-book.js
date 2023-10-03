const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  personalInfo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const AddressBook = new mongoose.model("Address-book", addressSchema);

module.exports = AddressBook;

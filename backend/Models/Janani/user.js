const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  bdate: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  loginDate: { type: Date, default: Date.now },
});

const users = new mongoose.model("Clients", userSchema);

module.exports = users;

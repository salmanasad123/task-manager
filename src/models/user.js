const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: function (value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate: function (value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

module.exports = User

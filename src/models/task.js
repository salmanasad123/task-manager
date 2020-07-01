const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // task should have the userID who created the task we are calling it owner
    required: true,
    ref: "User",   // model name 'User' for ref property
  },
});

module.exports = Task;

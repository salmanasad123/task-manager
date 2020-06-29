require("../src/db/mongoose");
const mongoose = require("mongoose");
const Task = require("../src/models/task");

const _id = mongoose.Types.ObjectId("5ef869bc0eac6606f0598d9a");

Task.findByIdAndDelete(_id)
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

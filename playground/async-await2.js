require("../src/db/mongoose");
const mongoose = require("mongoose");

const Task = require("../src/models/task");

const deleteTaskAndCount = async (id, completed) => {
  const _id = mongoose.Types.ObjectId(id);

  const task = await Task.findByIdAndDelete(_id);
  // the code below await Task.findByIdAndDelete will only run if the above line results in a success
  const count = await Task.countDocuments({ completed: completed });
  return count;
};

deleteTaskAndCount("5ef8732963366a2670fbfa37", false)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

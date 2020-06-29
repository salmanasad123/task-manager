require("../src/db/mongoose");
const mongoose = require("mongoose");
const User = require("../src/models/user");

const _id = mongoose.Types.ObjectId("5ef867c61b6104119c41e3c8");

User.findByIdAndUpdate(_id, { age: 26 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 0 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

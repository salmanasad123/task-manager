const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const me = new User({
//   name: "Jenn",
//   email: "jenn@gmail.com",
//   password:"1234567"
// });

// me.save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });

// const task = new Task({
//   description: "Learn the mongoose library",
//   completed: false,
// });

// task
//   .save()
//   .then((result) => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });

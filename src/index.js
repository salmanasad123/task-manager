const express = require("express");
const mongoose = require("mongoose");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// middleware example
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("Get requests are disabled");
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5efc6c4bc5e6b90de00b6dc1");
  // // populate allows us to populate data from a relationship
  // await task.populate("owner").execPopulate();
  // console.log(task);

  const user = await User.findById("5efc82d602db3627e016ff99");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();

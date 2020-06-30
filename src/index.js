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

// jwt example
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();

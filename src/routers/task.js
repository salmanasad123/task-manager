const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const mongoose = require("mongoose");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.find({})
  //   .then((tasks) => {
  //     res.status(200).send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then((task) => {
  //     res.status(201).send(task);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

router.get("/task/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send("Task not found");
  //     }
  //     res.status(200).send(task);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((value) => {
    return allowedUpdates.includes(value);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    if (!task) {
      res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  try {
    const deletedTask = await Task.findByIdAndDelete(_id);
    if (!deletedTask) {
      return res.status(400).send("Task not found");
    }
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

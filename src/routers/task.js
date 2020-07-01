const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

router.get("/tasks", auth, async (req, res) => {
  try {
    //const tasks = await Task.find({});
    await req.user.populate("tasks").execPopulate();
    res.status(200).send(req.user.tasks);
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

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

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

router.get("/task/:id", auth, async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id: _id, owner: req.user._id });

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

router.patch("/tasks/:id", auth, async (req, res) => {
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
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id: _id, owner: req.user._id });

    if (!task) {
      res.status(404).send("Task not found");
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  try {
    //const deletedTask = await Task.findByIdAndDelete(_id);
    const deletedTask = await Task.findOneAndDelete({
      _id: _id,
      owner: req.user._id,
    });
    if (!deletedTask) {
      return res.status(400).send("Task not found");
    }
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

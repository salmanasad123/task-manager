const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

  // user
  //   .save()
  //   .then((user) => {
  //     res.status(201).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});



router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
  // User.find({})
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.get("/users/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send("User not found");
  //     }
  //     res.status(200).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.patch("/users/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((value) => {
    return allowedUpdates.includes(value);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(400).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

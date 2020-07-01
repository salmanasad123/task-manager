const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const { response } = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

// sign up route
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token: token });
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

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user: user, token: token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

// auth middlware will run before any route handler
// fetch user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // User.find({})
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

router.get("/users/:id", auth, async (req, res) => {
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

router.patch("/users/me", auth, async (req, res) => {
  // const _id = mongoose.Types.ObjectId(req.params.id);
  const _id = mongoose.Types.ObjectId(req.user._id);

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((value) => {
    return allowedUpdates.includes(value);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // the findByIdAndUpdate method bypasses mongoose, it performs direct operations on the database so we have to go more traditional mongoose way
    // const user = await User.findById(_id);

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // if (!user) {
    //   return res.status(404).send("User not found");
    // }
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  // const _id = mongoose.Types.ObjectId(req.user._id);
  const _id = mongoose.Types.ObjectId(req.user._id); // we have access to request.user object which we have attached to req in auth middleware

  try {
    // const user = await User.findByIdAndDelete(_id);
    // if (!user) {
    //   return res.status(400).send("User not found");
    // }
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

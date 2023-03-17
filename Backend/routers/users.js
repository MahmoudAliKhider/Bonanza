const router = require("express").Router();
const userModel = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await userModel.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found🙂." });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = new userModel({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created! 🥲");

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const exUser = await userModel.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = exUser.passwordHash;
  }
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!user) return res.status(400).send("the user cannot be created!🥲");

  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    res.status(400).send("your account is not found 🗣️");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("email Or password not found 🤔");
  }
});

router.post("/register", async (req, res) => {
  let user = new userModel({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!😔");

  res.send(user);
});

router.get("/get/count", async (req, res) => {
  const userCount = await userModel.countDocuments().exec();
  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({ userCount: userCount });
});

router.delete("/:id", (req, res) => {
  userModel
    .findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted!🤨" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found!😵‍💫" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;

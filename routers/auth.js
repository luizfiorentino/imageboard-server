const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const User = require("../models").user;
const Image = require("../models").image;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .send({ message: "Please enter a valid email and password" });
  } else {
    // * find user based on email address
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({ message: "This email is not found" });
    }
    // * use bcrypt.compareSync to check the received password against the stored hash
    else if (bcrypt.compareSync(password, user.password)) {
      // * if the password is correct, return a JWT with the userId of the user (user.id).
      const jwt = toJWT({ userId: user.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({ message: "Incorrect password" });
    }
  }
});

module.exports = router;

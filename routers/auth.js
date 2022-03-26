const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const Image = require("../models").image;

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).send("Please enter a valid email and/or password");
    } else {
      res.send({ jwt: toJWT({ userId: 1 }) });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

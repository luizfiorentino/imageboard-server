const { Router } = require("express");
const { toData } = require("../auth/jwt");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      res.status(400).send("please inform title and url");
    } else {
      const newImage = await Image.create(req.body);
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:imageId", async (req, res, next) => {
  try {
    const thisImage = parseInt(req.params.imageId);
    const imageId = await Image.findByPk(thisImage);
    if (!imageId) {
      res.status(404).send("Image not found");
    } else {
      res.send(imageId);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
  next(e);
});

module.exports = router;

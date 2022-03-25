const { Router } = require("express");
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

module.exports = router;

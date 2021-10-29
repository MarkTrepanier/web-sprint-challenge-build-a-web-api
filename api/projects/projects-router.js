const express = require("express");
const {
  validateId,
  validatePost,
  handleError,
} = require("./projects-middleware");

//eslint-disable-next-line
const Project = require("./projects-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.get();
    console.log(projects);
    res.status(200).json(projects);
  } catch (er) {
    res.status(500);
  }
});

//eslint-disable-next-line
router.get("/:id", validateId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post("/", validatePost, async (req, res, next) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  } catch (er) {
    next();
  }
});

router.use(handleError);

module.exports = router;

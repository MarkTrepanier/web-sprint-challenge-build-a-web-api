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

router.put("/:id", validateId, validatePost, async (req, res, next) => {
  try {
    const changes = await Project.update(req.params.id, req.body);
    res.status(200).json(changes);
  } catch (er) {
    next();
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    //eslint-disable-next-line
    const removed = await Project.remove(req.params.id);
    res.status(200).json({ message: `deleted` });
  } catch (er) {
    next();
  }
});

router.get("/:id/actions", validateId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (er) {
    next();
  }
});

router.use(handleError);

module.exports = router;

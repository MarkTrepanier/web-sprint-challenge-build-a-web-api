const express = require("express");
const { validateId } = require("./projects-middleware");
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

router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.project);
});

module.exports = router;

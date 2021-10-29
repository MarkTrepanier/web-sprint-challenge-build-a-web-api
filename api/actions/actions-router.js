const express = require("express");
const { handleError } = require("../projects/projects-middleware");
const { validateId, validateAction } = require("./actions-middlware");

//eslint-disable-next-line
const Action = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (er) {
    res.status(500);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id);
    res.status(200).json(action);
  } catch (er) {
    next();
  }
});

router.post("/", validateAction, async (req, res, next) => {
  try {
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
  } catch (er) {
    next();
  }
});

router.put("/:id", validateId, validateAction, async (req, res, next) => {
  try {
    const changes = await Action.update(req.params.id, req.body);
    res.status(200).json(changes);
  } catch (er) {
    next();
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (er) {
    next();
  }
});

router.use(handleError);
module.exports = router;

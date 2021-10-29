const express = require("express");
//pull middleware
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
module.exports = router;

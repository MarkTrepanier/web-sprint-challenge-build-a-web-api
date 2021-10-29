const express = require("express");
//pull middleware
const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<div>success</div>`);
});

module.exports = router;

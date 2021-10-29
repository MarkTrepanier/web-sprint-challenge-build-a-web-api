const Project = require("./projects-model");

async function validateId(req, res, next) {
  Project.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({ status: 404 });
      }
    })
    .catch(next);
}

async function validatePost(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    next({ status: 400 });
  } else {
    next();
  }
}

//eslint-disable-next-line
function handleError(err, req, res, next) {
  res.status(err.status || 500).json({ error: `${err.status}` });
}

module.exports = {
  validateId,
  validatePost,
  handleError,
};

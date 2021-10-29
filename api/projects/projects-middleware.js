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

module.exports = {
  validateId,
};

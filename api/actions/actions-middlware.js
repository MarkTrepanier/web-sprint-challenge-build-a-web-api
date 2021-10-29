const Action = require("./actions-model");

async function validateId(req, res, next) {
  Action.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ status: 404 });
      }
    })
    .catch(next);
}

async function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    next({ status: 400 });
  } else {
    next();
  }
}

module.exports = {
  validateId,
  validateAction,
};

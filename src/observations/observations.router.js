const router = require("express").Router({ mergeParams: true });
const controller = require("./observations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// added GET method to the route
router.route("/").post(controller.create).get(controller.list).all(methodNotAllowed);

module.exports = router;
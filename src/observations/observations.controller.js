// require the service function
const service = require("./observations.service");
// require the asyncErrorBoundary() function
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// added the following validators

const validSkyConditions = [100, 101, 102, 103, 104, 106, 108, 109];

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "body must have data property" });
}

function hasLatitude(req, res, next) {
  const latitude = Number(req.body.data.latitude);
  if (latitude >= -90 && latitude <= 90) {
    return next();
  }
  next({ status: 400, message: "latitude must be between -90 and 90" });
}

function hasLongitude(req, res, next) {
  const longitude = Number(req.body.data.longitude);
  if (longitude >= -180 && longitude <= 180) {
    return next();
  }
  next({ status: 400, message: "longitude must be between -180 and 180" });
}

function hasSkyCondition(req, res, next) {
  const skyCondition = Number(req.body.data.sky_condition);

  if (validSkyConditions.includes(skyCondition)) {
    return next();
  }
  next({
    status: 400,
    message: `sky_condition must be one of: ${validSkyConditions}`,
  });
}

// HTTP methods

// updated the function below to call the service function
async function create(req, res) {
  //   const newObservation = req.body.data;

  //   const now = new Date().toISOString();
  //   newObservation.observation_id = nextId++;
  //   newObservation.created_at = now;
  //   newObservation.updated_at = now;

  //   observations.push(newObservation);

  const newObservation = await service.create(req.body.data);

  res.status(201).json({
    data: newObservation,
  });
}

// added list() function

async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

// updated the export to include validators for create
// added list to the export
// updated create to include asyncErrorBoundary()
module.exports = {
  create: [
    hasData,
    hasLatitude,
    hasLongitude,
    hasSkyCondition,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};

const express = require("express");
const cors = require("cors");
// required 'observations' router
const observationsRouter = require('./observations/observations.router');


const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(cors());
app.use(express.json());


///////////////////////////////////////////////////////////////////////

// POST method handler - PHASE ONE
// added the following code block as per lesson instructions to test POST
// by creating a simple inline handler for POST, you can get the API working in minutes to test the integration between the frontend and backend

// let nextId = 1;
// app.post("/observations", (req, res) => {
//   const newObservation = req.body.data;

//   newObservation.observation_id = nextId++;

//   res.status(201).json({
//     data: newObservation,
//   });
// });

///////////////////////////////////////////////////////////////////////

// POST method handler - PHASE TWO
// replaced PHASE ONE with the following

app.use("/observations", observationsRouter);

///////////////////////////////////////////////////////////////////////

app.use(notFound);
app.use(errorHandler);

module.exports = app;

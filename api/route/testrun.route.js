import express from "express";
import {
  getTestRuns,
  createTestRun,
} from "../controller/testrun.controller.js";

import {
  authenticate,
} from "../controller/apikey.controller.js";

const testRunRoutes = express.Router();

testRunRoutes.use(authenticate);

testRunRoutes
  .route("/")
  .get(getTestRuns)
  .post(createTestRun);

export default testRunRoutes;

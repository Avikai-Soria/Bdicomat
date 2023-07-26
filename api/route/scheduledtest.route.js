import express from "express";
import {
  getScheduledTest,
  createScheduledTest,
  getScheduledTests,
  deleteScheduledTest,
  updateScheduledTest,
} from "../controller/scheduledtest.controller.js";

import {
  authenticate,
  authorizeAdmin,
} from "../controller/apikey.controller.js";

const scheduledTestRoutes = express.Router();

scheduledTestRoutes.use(authenticate);

scheduledTestRoutes
  .route("/")
  .get(getScheduledTests)
  .post(authorizeAdmin, createScheduledTest);

scheduledTestRoutes
  .route("/:id")
  .get(getScheduledTest)
  .put(updateScheduledTest)
  .delete(authorizeAdmin, deleteScheduledTest);

export default scheduledTestRoutes;

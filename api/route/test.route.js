import express from "express";
import {
  getTests,
  createTest,
  getTest,
  deleteTest,
  updateTest,
} from "../controller/test.controller.js";

import {
  authenticate,
  authorizeAdmin,
} from "../controller/apikey.controller.js";

const testRoutes = express.Router();

testRoutes.use(authenticate);

testRoutes
  .route("/")
  .get(getTests)
  .post(authorizeAdmin, createTest);

testRoutes
  .route("/:id")
  .get(getTest)
  .put(authorizeAdmin, updateTest)
  .delete(authorizeAdmin, deleteTest);

export default testRoutes;

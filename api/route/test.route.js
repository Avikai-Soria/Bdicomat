import express from "express";
import {
  getTests,
  createTest,
  getTest,
  deleteTest,
  updateTest,
} from "../controller/test.controller.js";

import { authenticate } from "../controller/apikey.controller.js";

const testRoutes = express.Router();

testRoutes.use(authenticate);

testRoutes.route("/").get(getTests).post(createTest);

testRoutes.route("/:id").get(getTest).put(updateTest).delete(deleteTest);

export default testRoutes;

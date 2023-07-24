import express from "express";
import {
  getBugs,
  createBug,
  getBug,
  deleteBug,
  updateBug,
} from "../controller/bug.controller.js";

import {
  authenticate,
  authorizeAdmin,
} from "../controller/apikey.controller.js";

const bugRoutes = express.Router();

bugRoutes.use(authenticate);

bugRoutes
  .route("/")
  .get(getBugs)
  .post(authorizeAdmin, createBug);

bugRoutes
  .route("/:id")
  .get(getBug)
  .put(authorizeAdmin, updateBug)
  .delete(authorizeAdmin, deleteBug);

export default bugRoutes;

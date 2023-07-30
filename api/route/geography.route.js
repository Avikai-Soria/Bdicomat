import express from "express";
import { getGeographyStats } from "../controller/geography.controller.js";
import { authenticate } from "../controller/apikey.controller.js";

const geographyStatRoutes = express.Router();

geographyStatRoutes.use(authenticate);

geographyStatRoutes.get("/", getGeographyStats);

export default geographyStatRoutes;

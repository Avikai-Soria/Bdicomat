import express from "express";
import { getGeographyStats } from "../controller/geography.controller.js";

const geographyStatRoutes = express.Router();

geographyStatRoutes.get("/", getGeographyStats);

export default geographyStatRoutes;

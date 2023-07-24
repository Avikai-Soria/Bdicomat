import express from "express";
import { getDomainStats } from "../controller/domain.controller.js";

const domainStatRoutes = express.Router();

domainStatRoutes.get("/", getDomainStats);

export default domainStatRoutes;

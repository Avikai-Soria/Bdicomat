import express from "express";
import { getDomainStats } from "../controller/domain.controller.js";
import { authenticate } from "../controller/apikey.controller.js";

const domainStatRoutes = express.Router();

domainStatRoutes.use(authenticate);

domainStatRoutes.get("/", getDomainStats);

export default domainStatRoutes;

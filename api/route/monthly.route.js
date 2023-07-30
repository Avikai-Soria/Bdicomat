import express from "express";
import { getMonthlyStats } from "../controller/monthly.controller.js"; // Update the controller import
import { authenticate } from "../controller/apikey.controller.js";

const monthlyStatRoutes = express.Router();

monthlyStatRoutes.use(authenticate);

monthlyStatRoutes.get("/", getMonthlyStats); // Update the route to call the new controller function

export default monthlyStatRoutes;

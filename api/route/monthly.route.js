import express from "express";
import { getMonthlyStats } from "../controller/monthly.controller.js"; // Update the controller import

const monthlyStatRoutes = express.Router();

monthlyStatRoutes.get("/", getMonthlyStats); // Update the route to call the new controller function

export default monthlyStatRoutes;

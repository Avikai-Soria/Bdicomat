import express from "express";
import { getTypeStats } from "../controller/type.controller.js"; // Update the controller import

const typeStatRoutes = express.Router();

typeStatRoutes.get("/", getTypeStats); // Update the route to call the new controller function

export default typeStatRoutes;

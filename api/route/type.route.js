import express from "express";
import { getTypeStats } from "../controller/type.controller.js"; // Update the controller import
import { authenticate } from "../controller/apikey.controller.js";


const typeStatRoutes = express.Router();

typeStatRoutes.use(authenticate);

typeStatRoutes.get("/", getTypeStats); // Update the route to call the new controller function

export default typeStatRoutes;

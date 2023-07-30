import express from "express";
import { getNotifications } from "../controller/notification.controller.js";
import { authenticate } from "../controller/apikey.controller.js";

const notificationRoutes = express.Router();

notificationRoutes.use(authenticate);

// Route to get all notifications
notificationRoutes.get("/", getNotifications);

export default notificationRoutes;

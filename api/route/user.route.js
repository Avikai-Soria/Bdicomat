import express from "express";
import {
  getUser,
  createUser,
  deleteUserSelf,
  updateUserSelf,
  deleteUser,
  updateUser,
  getAllUsers
} from "../controller/user.controller.js";

import { authenticate, authorizeAdmin } from "../controller/apikey.controller.js";

const userRoutes = express.Router();

userRoutes.post("/", createUser);

userRoutes.use(authenticate);

userRoutes.route("/")
  .get(authorizeAdmin, getAllUsers)
  .delete(deleteUserSelf)
  .put(updateUserSelf);

  userRoutes.route("/:id")
  .get(getUser)
  .delete(authorizeAdmin, deleteUser)
  .put(authorizeAdmin, updateUser);

export default userRoutes;

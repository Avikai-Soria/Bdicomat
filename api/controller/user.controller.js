import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/user.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";

const databasePr = database.promise();

const usernamePattern = /^[^0-9].*$/;

// Checks if given id is the id number or username.
const isIdNumber = (id) => /^\d+$/.test(id);

// Filters the user's fields according to the requester.
const filterUserFields = (reqUserId, user) => {
  if (reqUserId === user.id) {
    return user;
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
  };
};

export const getUser = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching user...`);

  try {
    const isId = isIdNumber(req.params.id);
    const results = await databasePr.query(
      isId ? QUERY.SELECT_USER_BY_ID : QUERY.SELECT_USER_BY_USERNAME,
      [req.params.id]
    );

    if (results[0].length === 0) {
      const message =
        `User by ${isId ? "id" : "username"} ` +
        `${req.params.id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "User retrieved",
          filterUserFields(res.locals.userId, results[0][0])
        )
      );
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return handleInternalError(res);
  }
};

export const getAllUsers = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching all users...`);

  try {
    const results = await databasePr.query(QUERY.SELECT_USERS);

    if (results[0].length === 0) {
      const message = "No users found";
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "All users retrieved",
          results[0]
        )
      );
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return handleInternalError(res);
  }
};

const userCreationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  username: Joi.string().pattern(usernamePattern).min(1).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(4).max(255).required(),
  address: Joi.string().allow(null, "").max(255),
});

export const createUser = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating user...`);

  const { error } = userCreationSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  try {
    const { name, username, email, address, password } = req.body;

    // Get a connection from the pool
    const connection = await databasePr.getConnection();

    try {
      // Start a database transaction
      await connection.beginTransaction();

      // Create the user
      const userCreation = await connection.query(QUERY.CREATE_USER, [
        name,
        username,
        email,
        address,
      ]);
      const userId = userCreation[0].insertId;

      // Create the password
      const passwordCreation = await connection.query(QUERY.CREATE_PASSWORD, [
        userId,
        password,
      ]);

      // Add user role to UserRoles table
      const userRoleCreation = await connection.query(QUERY.ADD_USER_ROLE, [
        userId,
        "tester",
      ]);

      // Commit the transaction
      await connection.commit();

      const user = {
        id: userId,
        name,
        username,
        email,
        address: address || null,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            "User created",
            { user }
          )
        );
    } catch (error) {
      // Rollback the transaction
      await connection.rollback();

      console.error("Error creating user:", error.message);
      return handleInternalError(res);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return handleInternalError(res);
  }
};

const userUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  username: Joi.string().pattern(usernamePattern).min(1).max(255),
  email: Joi.string().email().max(255),
  address: Joi.string().allow(null, "").max(255),
  newPassword: Joi.string().min(4).max(255),
  oldPassword: Joi.string().min(4).max(255),
})
  .and("newPassword", "oldPassword")
  .min(1);

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(
    `${req.method} ${req.originalUrl}, updating user with ID: ${id}...`
  );
  await updateUserById(req, res, id);
};

export const updateUserSelf = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating user...`);
  const { userId } = res.locals;
  await updateUserById(req, res, userId);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(
    `${req.method} ${req.originalUrl}, deleting user with ID: ${id}...`
  );
  await deleteUserById(req, res, id);
};

export const deleteUserSelf = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting user...`);
  const { userId } = res.locals;
  await deleteUserById(req, res, userId);
};

const updateUserById = async (req, res, id) => {
  const { error } = userUpdateSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  try {
    // Get a connection from the pool
    const connection = await database.promise().getConnection();

    try {
      // Start a database transaction
      await connection.beginTransaction();

      // Fetch the user's current data
      const userResult = await connection.query(QUERY.SELECT_USER_BY_ID, [id]);

      if (userResult[0].length === 0) {
        // Rollback the transaction
        await connection.rollback();

        return handleNotFound(res, `User with ID ${id} not found`);
      }

      // Create an object with updated user data
      const updatedUser = {
        id,
        name: req.body.name || userResult[0][0].name,
        username: req.body.username || userResult[0][0].username,
        email: req.body.email || userResult[0][0].email,
        address:
          req.body.address !== undefined
            ? req.body.address
            : userResult[0][0].address,
      };

      // Update the user's data in the database
      if (
        req.body.name ||
        req.body.username ||
        req.body.email ||
        req.body.address !== undefined
      ) {
        await connection.query(QUERY.UPDATE_USER, [
          updatedUser.name,
          updatedUser.username,
          updatedUser.email,
          updatedUser.address,
          updatedUser.id,
        ]);
      }

      // Update the user's password if provided
      if (req.body.newPassword) {
        const passwordUpdate = await connection.query(QUERY.UPDATE_PASSWORD, [
          req.body.newPassword,
          id,
          req.body.oldPassword,
        ]);

        if (passwordUpdate[0].affectedRows === 0) {
          // Rollback the transaction
          await connection.rollback();

          return handleBadRequest(res, "Wrong password");
        }
      }

      // Commit the transaction
      await connection.commit();

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, "User updated", {
          user: updatedUser,
        })
      );
    } catch (error) {
      // Rollback the transaction
      await connection.rollback();

      console.error("Error updating user:", error.message);
      return handleInternalError(res);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
    return handleInternalError(res);
  }
};

const deleteUserById = async (req, res, id) => {
  try {
    console.log(QUERY.DELETE_USER, [id]);
    const result = await databasePr.query(QUERY.DELETE_USER, [id]);

    if (result[0].affectedRows === 1) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(HttpStatus.OK.code, HttpStatus.OK.status, "User deleted")
        );
    } else {
      // User with the given id was not found
      return handleNotFound(res, `User with ID ${id} not found`);
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return handleInternalError(res);
  }
};

export const upgradeUserToAdmin = async (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, upgrading user to admin...`);
  const { id } = req.params;

  try {
    // Get a connection from the pool
    const connection = await database.promise().getConnection();

    try {
      // Start a database transaction
      await connection.beginTransaction();

      // Check if the user exists
      const userResult = await connection.query(QUERY.SELECT_USER_BY_ID, [id]);

      if (userResult[0].length === 0) {
        // Rollback the transaction
        await connection.rollback();

        return handleNotFound(res, `User with ID ${id} not found`);
      }

      // Add the 'admin' role to the user
      await connection.query(QUERY.UPGRADE_USER_TO_ADMIN, [id]);

      // Commit the transaction
      await connection.commit();

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, "User upgraded to admin", {
          userId: id,
          role: 'admin',
        })
      );
    } catch (error) {
      // Rollback the transaction
      await connection.rollback();

      console.error("Error upgrading user to admin:", error.message);
      return handleInternalError(res);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error upgrading user to admin:", error.message);
    return handleInternalError(res);
  }
};

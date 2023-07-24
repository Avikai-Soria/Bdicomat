import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/bug.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

// Expecting to get object of [testId, userId, bugDescription, location, version, domain, status, isExcepted]
const bugSchema = Joi.object({
  testId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  bugDescription: Joi.string().required(),
  location: Joi.string().allow(null), // Assuming location can be optional (null)
  version: Joi.string().allow(null), // Assuming version can be optional (null)
  domain: Joi.string().allow(null), // Assuming domain can be optional (null)
  status: Joi.string().required(),
  isExcepted: Joi.string().valid("yes", "no").required(),
});

export const getBugs = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching bugs...`);

  const { bugId, limit, page } = req.query;

  const conditions = [];

  if (bugId) {
    conditions.push(`id=${bugId}`);
  }

  const query = generateQuery(QUERY.SELECT_BUGS, conditions, limit, page);

  database.query(query, async (error, results) => {
    if (error) {
      console.error("Error getting bugs:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Bugs retrieved", {
        bugs: results,
      })
    );
  });
};

export const createBug = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating bug`);

  // Validate the request body against the defined schema
  const { error } = bugSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const {
    testId,
    userId,
    bugDescription,
    location,
    version,
    domain,
    status,
    isExcepted,
  } = req.body;

  database.query(
    QUERY.CREATE_BUG,
    [testId, userId, bugDescription, location, version, domain, status, isExcepted],
    (error, results) => {
      if (error) {
        console.error("Error creating bug:", error.message);
        return handleInternalError(res);
      }

      const bugId = results.insertId;

      const bug = {
        id: bugId,
        testId,
        userId,
        bugDescription,
        location,
        version,
        domain,
        status,
        isExcepted,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Bug created`, {
            bug,
          })
        );
    }
  );
};

export const getBug = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching bug`);

  database.query(QUERY.SELECT_BUG, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting bug:", error.message);
      return handleInternalError(res);
    }

    if (!results[0]) {
      const message = `Bug by id ${req.params.id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Bug retrieved`, results[0])
      );
  });
};

export const updateBug = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating bug`);

  const { error } = bugSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { id } = req.params;
  const {
    testId,
    userId,
    bugDescription,
    location,
    version,
    domain,
    status,
    isExcepted,
  } = req.body;

  database.query(
    QUERY.UPDATE_BUG,
    [testId, userId, bugDescription, location, version, domain, status, isExcepted, id],
    (error, results) => {
      if (error) {
        console.error("Error updating bug:", error.message);
        return handleInternalError(res, error);
      }

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Bug updated`, {
          id,
          testId,
          userId,
          bugDescription,
          location,
          version,
          domain,
          status,
          isExcepted,
        })
      );
    }
  );
};

export const deleteBug = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting bug`);

  const bugId = req.params.id;

  database.query(QUERY.DELETE_BUG, [bugId], (error, results) => {
    if (error) {
      console.error("Error deleting bug:", error.message);
      return handleInternalError(res, error);
    }

    if (results.affectedRows === 0) {
      return handleNotFound(res, `Bug by id ${bugId} was not found`);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Bug deleted`, results[0])
      );
  });
};

import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/scheduledtest.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

const scheduledTestSchema = Joi.object({
  testId: Joi.number().integer().positive().required(),
  userId: Joi.number().integer().positive().required(),
  scheduledTime: Joi.date().required(),
});

export const getScheduledTests = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching scheduled tests...`);

  const { scheduledTestId, userId, limit, page } = req.query;

  const conditions = [];

  if (scheduledTestId) {
    conditions.push(`id=${scheduledTestId}`);
  }

  if (userId) {
    conditions.push(`userId=${userId}`);
  }

  const query = generateQuery(
    QUERY.SELECT_SCHEDULED_TESTS,
    conditions,
    limit,
    page
  );

  database.query(query, async (error, results) => {
    if (error) {
      console.error("Error getting scheduled tests:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(
        HttpStatus.OK.code,
        HttpStatus.OK.status,
        "Scheduled tests retrieved",
        {
          scheduledTests: results,
        }
      )
    );
  });
};

export const createScheduledTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating scheduled test`);

  // Validate the request body against the defined schema
  const { error } = scheduledTestSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { testId, userId, scheduledTime } = req.body;

  database.query(
    QUERY.CREATE_SCHEDULED_TEST,
    [testId, userId, scheduledTime],
    (error, results) => {
      if (error) {
        console.error("Error creating scheduled test:", error.message);
        return handleInternalError(res);
      }

      const scheduledTestId = results.insertId;

      const scheduledTest = {
        id: scheduledTestId,
        testId,
        userId,
        scheduledTime,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `Scheduled test created`,
            { scheduledTest }
          )
        );
    }
  );
};

export const getScheduledTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching scheduled test`);

  database.query(
    QUERY.SELECT_SCHEDULED_TEST,
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error getting scheduled test:", error.message);
        return handleInternalError(res);
      }

      if (!results[0]) {
        const message = `Scheduled test by id ${req.params.id} was not found`;
        return handleNotFound(res, message);
      }

      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Scheduled test retrieved`,
            results[0]
          )
        );
    }
  );
};

export const updateScheduledTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating scheduled test`);

  const { error } = scheduledTestSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { id } = req.params;
  const { testId, userId, scheduledTime } = req.body;

  database.query(
    QUERY.UPDATE_SCHEDULED_TEST,
    [testId, userId, scheduledTime, id],
    (error, results) => {
      if (error) {
        console.error("Error updating scheduled test:", error.message);
        return handleInternalError(res, error);
      }

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Scheduled test updated`, {
          id,
          testId,
          userId,
          scheduledTime,
        })
      );
    }
  );
};

export const deleteScheduledTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting scheduled test`);

  const scheduledTestId = req.params.id;

  database.query(QUERY.DELETE_SCHEDULED_TEST, [scheduledTestId], (error, results) => {
    if (error) {
      console.error("Error deleting scheduled test:", error.message);
      return handleInternalError(res, error);
    }

    if (results.affectedRows === 0) {
      return handleNotFound(res, `Scheduled test by id ${scheduledTestId} was not found`);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Scheduled test deleted`,
          results[0]
        )
      );
  });
};

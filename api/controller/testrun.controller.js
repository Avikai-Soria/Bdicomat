import Joi from "joi";
import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/testrun.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";


const testRunSchema = Joi.object({
  testId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
});

export const getTestRuns = (req, res) => {
  const { testRunId, limit, page } = req.query;

  const conditions = [];

  if (testRunId) {
    conditions.push(`id=${testRunId}`);
  }

  const query = generateQuery(QUERY.SELECT_TEST_RUNS, conditions, limit, page);

  database.query(query, async (error, results) => {
    if (error) {
      console.error("Error getting test runs:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(
        HttpStatus.OK.code,
        HttpStatus.OK.status,
        "Test runs retrieved",
        {
          testRuns: results,
        }
      )
    );
  });
};

export const createTestRun = (req, res) => {
  // Validate the request body against the defined schema
  const { error } = testRunSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { testId, userId } = req.body;

  const resultOptions = ["pass", "fail", "running"];
  const randomResult =
    resultOptions[Math.floor(Math.random() * resultOptions.length)];

  const details = "Details for the test run";

  const randomDuration = Math.floor(Math.random() * 1000) + 1;

  const startTest = new Date().toISOString(); // Current date and time

  database.query(
    QUERY.CREATE_TEST_RUN,
    [testId, userId, randomResult, details, randomDuration],
    (error, results) => {
      if (error) {
        console.error("Error creating test run:", error.message);
        return handleInternalError(res);
      }

      const testRunId = results.insertId;

      res.status(HttpStatus.CREATED.code).send(
        new Response(
          HttpStatus.CREATED.code,
          HttpStatus.CREATED.status,
          "Test run created",
          {
            testRunId,
            testId,
            userId,
            startTest,
            result: randomResult,
            details,
            duration: randomDuration,
          }
        )
      );
    }
  );
};

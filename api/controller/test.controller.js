import Joi from "joi";

import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import QUERY from "../query/test.query.js";
import {
  handleInternalError,
  handleBadRequest,
  handleNotFound,
} from "../util/handles.js";
import generateQuery from "../query/queryUtils.js";

// Expecting to get object of [name, description, expectedResult, configuration, domain, version]
const testSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().required(),
  expectedResult: Joi.string().required(),
  configuration: Joi.string().required(),
  domain: Joi.string().required(),
  version: Joi.string().required(),
});

export const getTests = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching tests...`);

  const { testId, limit, page } = req.query;

  const conditions = [];

  if (testId) {
    conditions.push(`testId=${testId}`);
  }

  const query = generateQuery(QUERY.SELECT_TESTS, conditions, limit, page);

  database.query(query, async (error, results) => {
    if (error) {
      console.error("Error getting tests:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Tests retrieved", {
        tests: results,
      })
    );
  });
};

export const createTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, creating test`);

  // Validate the request body against the defined schema
  const { error } = testSchema.validate(req.body);

  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { name, description, expectedResult, configuration, domain, version } = req.body;

  database.query(
    QUERY.CREATE_TEST,
    [name, description, expectedResult, configuration, domain, version],
    (error, results) => {
      if (error) {
        console.error("Error creating test:", error.message);
        return handleInternalError(res);
      }

      const testId = results.insertId;

      const test = {
        id: testId,
        name,
        description,
        expectedResult,
        configuration,
        domain,
        version,
      };

      res
        .status(HttpStatus.CREATED.code)
        .send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `Test created`,
            { test }
          )
        );
    }
  );
};

export const getTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching test`);

  database.query(QUERY.SELECT_TEST, [req.params.id], (error, results) => {
    if (error) {
      console.error("Error getting test:", error.message);
      return handleInternalError(res);
    }

    if (!results[0]) {
      const message = `Test by id ${req.params.id} was not found`;
      return handleNotFound(res, message);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Test retrieved`,
          results[0]
        )
      );
  });
};

export const updateTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, updating test`);

  const { error } = testSchema.validate(req.body);
  if (error) {
    return handleBadRequest(res, error.details[0].message);
  }

  const { id } = req.params;
  const { name, description, expectedResult, configuration, domain, version } = req.body;

  database.query(
    QUERY.UPDATE_TEST,
    [name, description, expectedResult, configuration, domain, version, id],
    (error, results) => {
      if (error) {
        console.error("Error updating test:", error.message);
        return handleInternalError(res, error);
      }

      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Test updated`, {
          id,
          name,
          description,
          expectedResult,
          configuration,
          domain,
          version,
        })
      );
    }
  );
};

export const deleteTest = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, deleting test`);

  const testId = req.params.id;

  database.query(QUERY.DELETE_TEST, [testId], (error, results) => {
    if (error) {
      console.error("Error deleting test:", error.message);
      return handleInternalError(res, error);
    }

    if (results.affectedRows === 0) {
      return handleNotFound(res, `Test by id ${testId} was not found`);
    }

    res
      .status(HttpStatus.OK.code)
      .send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Test deleted`,
          results[0]
        )
      );
  });
};

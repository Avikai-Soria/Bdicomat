import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import { handleInternalError } from "../util/handles.js";
import QUERY from "../query/type.query.js";

export const getTypeStats = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching type statistics...`);

  const query = QUERY.SELECT_TYPE_STATS;

  database.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching type statistics:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Type statistics retrieved", {
        typeStats: results,
      })
    );
  });
};

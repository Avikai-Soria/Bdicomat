import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import { handleInternalError } from "../util/handles.js";
import QUERY from "../query/geography.query.js";

export const getGeographyStats = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching geographic statistics...`);

  const query = QUERY.SELECT_GEOGRAPHY_STATS;

  database.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching geographic statistics:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Geographic statistics retrieved", {
        geographicStats: results,
      })
    );
  });
};

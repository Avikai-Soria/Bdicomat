import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import { handleInternalError } from "../util/handles.js";
import QUERY from "../query/monthly.query.js";

export const getMonthlyStats = (req, res) => {
  console.log(`${req.method} ${req.originalUrl}, fetching monthly statistics...`);

  const query = QUERY.SELECT_MONTHLY_STATS;

  database.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching monthly statistics:", error.message);
      return handleInternalError(res);
    }

    res.status(HttpStatus.OK.code).send(
      new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Monthly statistics retrieved", {
        monthlyStats: results,
      })
    );
  });
};

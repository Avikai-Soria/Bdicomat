import database from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/http-status.js";
import generateQuery from "../query/queryUtils.js";
import QUERY from "../query/notification.query.js";


export const getNotifications = (req, res) => {
    console.log(`${req.method} ${req.originalUrl}, fetching notifications...`);

    const { userId } = res.locals;
  
    const { limit, page } = req.query;

    const conditions = [];
  
    const query = generateQuery(QUERY.SELECT_NOTIFICATIONS_BY_USER_ID, conditions, limit, page);
  
    database.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error getting notifications:", error.message);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
          new Response(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status,
            "Internal server error"
          )
        );
      }
  
      res.status(HttpStatus.OK.code).send(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Notifications retrieved", {
          notifications: results,
        })
      );
    });
  };
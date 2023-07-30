import express from "express";
import cors from "cors";
import Response from "./util/response.js";
import HttpStatus from "./util/http-status.js";
import database from "./config/mysql.config.js";
import apikeyRoutes from "./route/apikey.route.js";
import userRoutes from "./route/user.route.js";

import testRoutes from "./route/test.route.js";
import bugRoutes from "./route/bug.route.js";
import domainStatRoutes from "./route/domain.route.js";
import monthlyStatRoutes from "./route/monthly.route.js";
import geographyStatRoutes from "./route/geography.route.js";
import typeStatRoutes from "./route/type.route.js";
import testRunRoutes from "./route/testrun.route.js";
import scheduledTestRoutes from "./route/scheduledtest.route.js";
import notificationRoutes from "./route/notification.route.js";

const PORT = process.env.PORT || 2999;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/apikeys", apikeyRoutes);
app.use("/users", userRoutes);
app.use("/tests", testRoutes);
app.use("/bugs", bugRoutes);
app.use("/domainstat", domainStatRoutes);
app.use("/monthlystat", monthlyStatRoutes);
app.use("/geographicstat", geographyStatRoutes);
app.use("/typestat", typeStatRoutes);
app.use("/testruns", testRunRoutes);
app.use("/scheduledtests", scheduledTestRoutes);
app.use("/notifications", notificationRoutes);


app.get("/", (req, res) =>
  database.query("SELECT * FROM Passwords", function (err, results) {
    if (err) {
      throw err;
    }
    res.send(
      new Response(
        HttpStatus.OK.code,
        HttpStatus.OK.status,
        "Patient API, v1.0.0 - All Systems Go",
        results
      )
    );
  })
);

app.all("*", (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Route does not exist on the server"
      )
    );
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

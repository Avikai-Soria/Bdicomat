const testWrapper = (port) => {
  const e = require("express");
  const express = require("express");
  const app = express();
  const http = require("http").Server(app);
  const io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });

  let value = 0;

  io.on("connection", (socket) => {
    console.log("A user connected to SetUpServer with port:", port);
    const interval = setInterval(() => {
      value += 0.0001;
      if (value >= 1) {
        value = 1;
        clearInterval(interval); // Stop the interval once the value reaches 1
      }
      socket.emit("message", value.toFixed(2)); // Emit the message with two decimal places
    }, 1000); // Emit every 1 ms
  });

  http.listen(port, () => {
    console.log(`Server 2 listening on http://localhost:${port}`);
  });
};
module.exports = testWrapper;

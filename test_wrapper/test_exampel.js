const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});


io.on('connection', (socket) => {
  console.log('A user connected to Server 2');

  // Sending a message to Server 1
  socket.emit('message', 'Hello from Server 2!');
});

http.listen(3002, () => {
  console.log('Server 2 listening on http://localhost:3002');
});
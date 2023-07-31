import { io } from "socket.io-client";

const connectToSetUpServer = (port, setData) => {
  const socket = io(`http://localhost:${port}`);

  socket.on("connect", () => {
    console.log(`Connected to the SetUpServer with port: ${port}`);
  });

  socket.on("message", (data) => {
    console.log(`Received progress from SetUpServer with port: ${port}:`, data);
    setData(data);
  });
};

export default connectToSetUpServer;

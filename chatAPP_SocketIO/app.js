const express = require("express");
const app = express();
const http = require("http");
const appServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(appServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let arr = ["john", 26];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    socket.emit("received", arr);
    socket.on("return", (res) => {
      console.log(res);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.emit("serverACK", "Hello client");
});

appServer.listen(3000, () => {
  console.log("listening on *:3000");
});

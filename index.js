const app = require("express")();
// sama aja dengan
// const express = require('express');
// const app = express();

// buat sebuah server method HTTP modules
const http = require("http");
const server = http.createServer(app);
const PORT = 8000;
// import socket.io
const socketIO = require("socket.io");

app.use(cors());

// buat http server dengan mentransformasi http di dalam `server` ke dalam `socketIo`
const io = socketIO(server);
let arrMsg = []
app.io = io;
// menyimpan message
app.arrMsg = arrMsg;

// jalankan io
io.on("connection", socket => {
   socket.on('joinChat', (data) => {
      console.log("User joined: ", data)
   })
   socket.on('disconnect', () => {
      console.log("User disconnected")
   }
});

server.listen(PORT, () => {
	console.log("Socket server is running at ", PORT);
});


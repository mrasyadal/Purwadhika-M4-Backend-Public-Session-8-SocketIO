const express = require("express");
const cors = require("cors");
// buat sebuah server method HTTP modules
const http = require("http");
const server = http.createServer(app);
const PORT = 8000;
// import socket.io
const socketIO = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// buat http server dengan mentransformasi http di dalam `server` ke dalam `socketIo`
const io = socketIO(server);
let arrMsg = [];
app.io = io;
// menyimpan message
app.arrMsg = arrMsg;

// menerima data dr FE dan mengirim data (ke DB ??)
app.post("/sendMessage", (req, res) => {
	// menerima data dr FE di req.body dan ditampung di variabel `arrMsg`
	arrMsg.push(req.body);

	// kirim chat terbaru ke sisi FE
	// note: FE harus menunggu adanya pengiriman dr `emit` dengan event 'chatMessage'
	io.emit("chatMessage", arr.arrMsg);
	// kirimkan data chat yg terbaru menggunakan `res`
	res.status(200).send(arrMsg);
});

// jalankan io
io.on("connection", (socket) => {
	socket.on("joinChat", (data) => {
		console.log("User joined: ", data);
	});
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(PORT, () => {
	console.log("Socket server is running at ", PORT);
});

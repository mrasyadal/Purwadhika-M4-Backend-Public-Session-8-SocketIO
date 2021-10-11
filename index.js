const express = require("express");
const cors = require("cors");
// buat sebuah server method HTTP modules
const http = require("http");
const server = http.createServer(app);
const PORT = 8000;
// import socket.io
const socketIO = require("socket.io");
const { channel } = require("diagnostics_channel");

const app = express();
app.use(cors());
app.use(express.json());

// buat http server dengan mentransformasi http di dalam `server` ke dalam `socketIo`
const io = socketIO(server);
// ada 2 array penyimpan message, dibedakan berdasarkan namespace yg digunakan
let arrMsg = [];
let arrChn = [];
app.io = io;
// menyimpan message
app.arrMsg = arrMsg;

// M4S8C3: Emit
// menerima data dr FE dan mengirim data (ke DB ??)
app.post("/sendMessage", (req, res) => {
	// di M4S8C4: pisahkan tempat penyimpanan chat message berdasarkan namespace yg digunakan
	// membaca nama namespace dari query URL (e.g. /sendMessage?namespace=default)
	if (req.query.namespace === "default") {
		// menerima data dr FE di req.body dan ditampung di variabel `arrMsg`
		arrMsg.push(req.body);

		// kirim chat terbaru ke sisi FE
		// note: FE harus menunggu adanya pengiriman dr `emit` dengan event 'chatMessage'
		io.emit("chatMessage", arrMsg);
		// kirimkan data chat yg terbaru menggunakan `res`
		res.status(200).send(arrMsg);
	} else {
		arrChn.push(req.body);

		channelNsp.emit("chatMessage", arrChn);
		res.status(200).send(arrChn);
	}
});

// jalankan io untuk namespace default
io.on("connection", (socket) => {
	socket.on("joinChat", (data) => {
		console.log("User ", data, " joined");
	});
	socket.on("disconnect", () => {
		console.log("User disconnected from the channel");
	});
});

// M4S8C4: Namespace
// membuat namespace baru
const channelNsp = io.of("/channel");
// connect client dgn namespace baru
channelNsp.on("connection", (socket) => {
	socket.on("joinChat", (data) => {
		console.log("User ", data, " joined");
	});
	socket.on("disconnect", () => {
		console.log("User disconnected from the channel");
	});
});

server.listen(PORT, () => {
	console.log("Socket server is running at ", PORT);
});

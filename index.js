const express = require('express');
const socket_conn = require('socket.io');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;  // Vercel will assign its own port
let count = 0;
let data;
const server = http.createServer(app);
const socket_io = new socket_conn.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.text());

// Handle HTTP GET requests
app.get('/', (req, res) => {
    res.send(`CONNECTED TO VIJAY'S NINJA SERVER\nYOU ARE ORBIE${count}`);
    count++;
});

// Handle HTTP POST requests to receive data from ESP32
app.post('/esp32-data', (req, res) => {
    data = req.body;
    console.log("Received from ESP32:", data);

    // Emit the data to all connected WebSocket clients
    socket_io.emit("serverMessage", data);

    res.send("Data received from ESP32");  // Acknowledge receipt of data
});

// Handle WebSocket connections
socket_io.on('connection', (socket) => {
    console.log('A client connected');
    socket.emit('serverMessage', 'hello world');
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

app.get('/er', (req, res) => {
    res.send(data);
    socket_io.emit("serverMessage", data);
});

// Server listening on the provided PORT
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

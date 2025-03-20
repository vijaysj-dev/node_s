const express = require('express');
const socket_conn = require('socket.io');
const http = require('http');

const app = express();
const PORT = 3000;
let count = 0;
var data;
const server = http.createServer(app);
const socket_io = new socket_conn.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.text());

app.get('/', (req, res) => {
    res.send(`CONNECTED TO VIJAY'S NINJA SERVER\nYOU ARE ORBIE${count}`);
    count++;
});

socket_io.on('connection', (socket) => {
    console.log('A client connected');
    socket.emit('serverMessage', 'hello');
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

app.get('/er', (req, res) => {
  res.send(data);
  socket_io.emit("serverMessage", data);

  
});

app.post('/snw', (req, res) => {
    res.send("done");
    data = req.body;
    console.log("Received from HTTP:", data);
    socket_io.emit("serverMessage", data);
    
});

server.listen(PORT, () => {
    console.log(`Server is running on http://192.168.29.66:${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A new connection has been made');
    socket.on('disconnect', () => console.log('A connection has been lost'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => console.log(`Message: ${msg}`));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => io.emit('chat message', msg));
});


server.listen(port, () => console.log(`Listening on port ${port}`));
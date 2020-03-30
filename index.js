const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8000 || process.env.PORT;

let users = [];

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    users.push(socket.id);
    console.log(`User ${socket.id} connected!!`);
    socket.broadcast.emit('user connected', socket.id);
    socket.emit('online users', users.filter((user) => user != socket.id));

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected!!`);
        users.splice(users.indexOf(socket.id), 1);
    })
})

http.listen(port, () => console.log(`listening on *:${port}`));
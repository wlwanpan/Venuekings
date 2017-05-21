var express = require('express');

// Create our app
var app = express();
var serv = require('http').Server(app);
const PORT = process.env.PORT || 3000;
const SERVER_TICK = 1000;

// Fix https request to http if needed
// weather website api only works on http
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'));

serv.listen(PORT, function () {
    console.log('Express server is up on port ' + PORT);
});

var io = require('socket.io')(serv, {});

var socketList = [];

io.on('connection', (socket) => {

    console.log(`User${userCount} connected`);

    socket.id = id;
    socketList.push(socket);

    socket.on('disconnect', () => {
        socketList.pop(socket);
        console.log(`${socket.id} disconnected`);
    });
});

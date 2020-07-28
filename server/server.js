let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let cors = require('cors');


server.listen(8000);

app.use(cors())

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    console.log("Успешное соединение: " + socket.id);
    connections.push(socket);
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились: " + socket.id);
    })
    
    socket.on("send mess", function(data) {
        console.log("data: ", data)
        socket.broadcast.emit("add mess",  {
            message: data.message, 
            name: data.name, 
            date: data.date 
        })
    })
})

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket_io = require('socket.io');
const io = socket_io(server);

io.on('connection', function (socket) {
    console.log("Успешное подключение: " + socket.id)
    socket.on('disconnect', function(data) {
        console.log("Отключились: " + socket.id);
    })
    socket.emit("your id", socket.id)

    socket.on("send message", function(data) {
        console.log("data: ", data)
        const obj = {
            message: data.message, 
            name: data.name, 
            date: data.date 
        }
        io.emit("message", obj)
    })
})

server.listen(8000);

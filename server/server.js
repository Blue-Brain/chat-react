const port = 8000;
var io = require('socket.io').listen(port);

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    console.log("Успешное соединение");
    connections.push(socket);
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    })
    
    socket.on("send mess", function(data) {
        console.log("data: ", data)
        io.sockets.emit("add mess",  {mess: data.mess, name: data.name})
    })
})

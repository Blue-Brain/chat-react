const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket_io = require("socket.io");
const io = socket_io(server);

const helper = (name, message) => ({ name, message });

io.on("connection", function(socket) {
  console.log("Успешное подключение: " + socket.id);
  socket.on("disconnect", function(data) {
    console.log("Отключились: " + socket.id);
  });

  socket.on("userJoined", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("Некорректные данные");
    }

    let room = socket.handshake['query']['r_var'];
    console.log (room)

    socket.join(room);
    callback({ 
      userID: socket.id, 
      pathRoom: room
    });
    socket.emit(
      "message",
      helper("notification", `Добро пожаловать, ${data.name}.`)
    );
    socket.broadcast
      .to(data.room)
      .emit(
        "message",
        helper("notification", `Новый пользователь, ${data.name}.`)
      );
  });

  socket.on("send message", function(data) {
    const obj = {
      message: data.message,
      name: data.name,
      date: data.date,
    };
    io.to(data.room).emit("message", obj);
  });
});

server.listen(8000);

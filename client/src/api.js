import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000'); 

function subscribeToMessager(objectState, callback) {  
  socket.on("add mess", data => {
      callback(data)
    })
  console.log("Что пришло в objState ", objectState)
  socket.emit('send mess', {mess: objectState.message, name: objectState.name});

};

export { subscribeToMessager };
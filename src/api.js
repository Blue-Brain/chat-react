import openSocket from 'socket.io-client';


// function subscribeToMessager(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 5000);
// }


function subscribeToMessager(objectState) {
    var objSocket = openSocket('http://localhost:8000');
    var min=1;
    var max=6;
    var random = Math.floor(Math.random() * (max-min)) + min;

    var alertClass;
    switch (random) {
      case 1: 
        alertClass="secondary";
        break;
      case 2: 
        alertClass="danger";
        break;
      case 3: 
        alertClass="success";
        break;
      case 4: 
        alertClass="warning";
        break;
      case 5: 
        alertClass="info";
        break;
      case 6: 
        alertClass="light";
        break;
      default: alertClass="danger"
    }
    
    var socket = objSocket.connect();

    var form={};
    form.id= document.getElementById("#messForm");
    form.action="http://localhost:8000";
    form.metod="POST";
    console.log(form);
    var textarea = objectState.message;
    var name = objectState.name;
    var all_messages = document.getElementById("#all_mess");

    form.id.submit(function(event) {
      event.preventDefault();
      socket.emit('send mess', {mess: textarea, name: name, colorUser: alertClass, all_messages: all_messages});
      textarea.val('');
    })

    socket.on("add mess", function(data) {
      form.innerHTML = `<div className='alert alert-${data.color}'><b> ${data.name}:</b> ${data.mess} </div>`

      document.data.all_messages.append(form)
      console.log("data: ", data)
    })
  };

export { subscribeToMessager };
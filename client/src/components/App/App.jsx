import React, { useRef, useState, useEffect }  from 'react';
import Header from '../Header/Header';
import Messages from '../Messages/Messages';
import FormSend from '../FormSend/FormSend';
import io from 'socket.io-client';

const App = () => {
  const refMessages = useRef(null);
  const refName = useRef(null);
  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null)

  const enterName = () => {
    setUserName(refName.current.value)
  }

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000');
    
    socketRef.current.on("your id", id => {
      setYourID(id)
    })
    socketRef.current.on("message", mess => {
      setMessages(msgs => [...msgs, mess]);
    })
  }, [])

  return (
    <div className="container">
      {
        userName 
          ? (
            <>
              <Header
                userName={userName}
              />
              <div className="row">
                <FormSend 
                  refMessages={refMessages}   
                  userName={userName}      
                  messages={messages}
                  setMessages={setMessages}
                  yourID={yourID}
                  socketRef={socketRef}
                />
                <Messages 
                  refMessages={refMessages}
                  userName={userName}      
                  messages={messages}
                />
              </div>
            </>
          ) :
          (
            <div>
              <label htmlFor="name">Имя</label>
              <input type="text" 
                  name="name" 
                  id="name"
                  className="form-control"
                  placeholder="Введите имя"
                  ref={refName}
              />
              <button 
                className="btn btn-success"
                onClick={enterName}
              >
                Вступить в чат
              </button>
            </div>
          )
      }
    </div>
  );
}

export default App;

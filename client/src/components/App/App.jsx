import React, { useRef, useState }  from 'react';
import Header from '../Header/Header';
import Messages from '../Messages/Messages';
import FormSend from '../FormSend/FormSend';

const App = () => {
  const refMessages = useRef(null);
  const refName = useRef(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);

  const enterName = () => {
    setUserName(refName.current.value)
  }

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

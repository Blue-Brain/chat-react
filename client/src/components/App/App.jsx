import React, { useRef, useState, useEffect } from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from "../Header/Header";
import Messages from "../Messages/Messages";
import FormSend from "../FormSend/FormSend";
import io from "socket.io-client";

const App = ({ history }) => {
  const refMessages = useRef(null);
  const socketRef = useRef(null);

  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  
  const regExpPath = /\/room-\d{5}/;

  const clickJoinChat = () => {
    const randomRoom = Math.floor(Math.random().toFixed(5) * 100000);
    setRoom(`room-${randomRoom}`);
  };

  const upadateUserName = (e) => {
      setUserName(e.target.value);
  }

  useEffect (() => {
    if (userName===null) {
      window.location.pathname = '/';
    }
  }, [userName])

  useEffect (()=> {
    if (regExpPath.test(window.location.pathname)) {
      setUserName(prompt('Введите ваше имя', undefined));
      setRoom(window.location.pathname.slice(1));
    }
  }, [])

  useEffect(() => {
    if (room) {
      const user = {
        name: userName,
        room: room,
      };
      const connect = () => {
        return io.connect(`http://localhost:8000`, {
          query: 'r_var='+room
        });
      }

      socketRef.current = connect();

      socketRef.current.emit("userJoined", user, (data) => {
        if (typeof data === "string") {
          console.error(data);
        } else {
          console.log(data)
          setYourID(data.userID);
          history.push(data.pathRoom)
        }
      });

      socketRef.current.on("message", (mess) => {
        setMessages((msgs) => [...msgs, mess]);
      });
    } 
  }, [room]);
  
  return (
      <Switch>
        <Route exact path="/" render={
          () => (
            <div className="container">
              <div>
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Введите имя"
                  onChange={(e)=>upadateUserName(e)}
                />
                {
                  userName ?
                      <button className="btn btn-success" onClick={clickJoinChat}>
                        Вступить в чат
                      </button>
                    : 
                    ""
                }
                
              </div>
            </div>
          )}
        />
        <Route path={regExpPath} 
          render = {
            () => (
              <div className="container">
              <Header userName={userName} />
                <div className="row">
                  <FormSend
                    refMessages={refMessages}
                    userName={userName}
                    messages={messages}
                    setMessages={setMessages}
                    yourID={yourID}
                    socketRef={socketRef}
                    room={room}
                  />
                  <Messages
                    refMessages={refMessages}
                    userName={userName}
                    messages={messages}
                  />
                </div>
              </div>
            )
          }
        />
      </Switch>
  );
};

export default withRouter(App);

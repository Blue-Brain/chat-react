import React, { useRef, useState, useEffect } from "react";
import Header from "../Header/Header";
import Messages from "../Messages/Messages";
import FormSend from "../FormSend/FormSend";
import io from "socket.io-client";

const App = () => {
  const refMessages = useRef(null);
  const refName = useRef(null);
  const refRoom = useRef(null);
  const socketRef = useRef(null);

  const [yourID, setYourID] = useState();
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const enterName = () => {
    setUserName(refName.current.value);
    setRoom(refRoom.current.value);
  };

  useEffect(() => {
    if (userName && room) {
      const user = {
        name: userName,
        room: room,
      };

      socketRef.current = io.connect("http://localhost:8000");

      socketRef.current.emit("userJoined", user, (data) => {
        if (typeof data === "string") {
          console.error(data);
        } else {
          setYourID(data.userID);
        }
      });

      socketRef.current.on("message", (mess) => {
        setMessages((msgs) => [...msgs, mess]);
      });
    }
  }, [userName, room]);

  return (
    <div className="container">
      {!userName || !room ? (
        <div>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Введите имя"
            ref={refName}
          />

          <label htmlFor="room">Комната</label>
          <input
            type="text"
            name="room"
            id="room"
            className="form-control"
            placeholder="Введите название комнаты"
            ref={refRoom}
          />
          <button className="btn btn-success" onClick={enterName}>
            Вступить в чат
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;

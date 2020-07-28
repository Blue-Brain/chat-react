import React, { useRef, useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000'); 

const FormSend = ({ userName, setMessages }) => {
    const refForm = useRef(null);
    const [message, setMessage] = useState([]);

    const onSendForm = (e) => {
        e.preventDefault();
        const date = new Date();
        console.log()
        const newMessage = {
            name: userName,
            message: refForm.current.value,
            date: date.toString().split(" ").slice(1, 5).join("/"),
        }
        socket.emit("send mess", newMessage);
        setMessage([newMessage]);
        setMessages(msgs => [...msgs, newMessage]);
    }

    useEffect(function() {
        if (message.length>0) {
            socket.once("add mess", function(data) {
                console.log (data);
                setMessages(msgs => {
                    console.log(msgs)
                    return [...msgs, data]
                });
                console.log (message);
            })
        }
    }, [message, setMessages])
    
    return (
        <div className="col-6">
            <h3>Форма сообщений</h3>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            <form 
                id="messForm" 
                action='http://localhost:8000' 
                method="POST"
                onSubmit={(e) => onSendForm(e)}
            >                                
                <br/>
                <label htmlFor="message">Сообщения</label>
                <textarea 
                    name="message" 
                    id="message" 
                    className="form-control"
                    placeholder="Введите сообщение"
                    ref={refForm}
                />
                <br/>
                <button 
                    onClick={(e) => onSendForm(e)}
                    className="btn btn-danger"
                >Отправить</button>
            </form>
        </div>
    )
}

export default FormSend;
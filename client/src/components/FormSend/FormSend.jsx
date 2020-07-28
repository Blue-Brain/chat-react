import React, { useRef } from 'react';

const FormSend = ({ userName, yourID, socketRef }) => {
    const refForm = useRef(null);

    const onSendForm = (e) => {
        e.preventDefault();
        const date = new Date();
        const newMessage = {
            id: yourID,
            name: userName,
            message: refForm.current.value,
            date: date.toString().split(" ").slice(1, 5).join("/"),
        }
        socketRef.current.emit("send message", newMessage);
    }

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
import React, { useRef } from 'react';
import { subscribeToMessager } from '../../api';

const FormSend = () => {
    const refMessages = useRef(null);

    const onMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    const onName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    const pushToAllMessage = () => {
        // e.preventDafult();
        var arrayMessages=[];
        arrayMessages.push(this.state.messageUser);
        this.setState({
            all_messages: arrayMessages
        })
    }

    const onSendForm = (e) => {
        e.preventDefault();
        console.log("BEGIN")
        subscribeToMessager({
                name: this.state.name,
                message: this.state.message,
            }, data => {
                this.setState({
                    messageUser: data
                })
            }
        )   
        pushToAllMessage(e);
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
                <label htmlFor="name">Имя</label>
                <input type="text" 
                    name="name" 
                    id="name"
                    className="form-control"
                    placeholder="Введите имя"
                    onChange={onName}
                />
                <br/>
                <label htmlFor="message">Сообщения</label>
                <textarea 
                    name="message" 
                    id="message" 
                    className="form-control"
                    placeholder="Введите сообщение"
                    onChange={onMessage}
                />
                <br/>
                <button 
                    onClick={(e) => this.onSendForm(e)}
                    className="btn btn-danger"
                >Отправить</button>
            </form>
        </div>
    )
}

export default FormSend();
import React from 'react';
import { subscribeToMessager } from '../../api';

const INITIAL_STATE = {
    message:"No message",
    name: "No name",
    top: true,
    all_messages: []
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE };
        this.elementMessages = React.createRef();
    }

    onMessage = (e) => {
    this.setState({
        message: e.target.value
    })
    }
    onName = (e) => {
    this.setState({
        name: e.target.value
    })
    }
    pushToAllMessage = () => {
        // e.preventDafult();
        var arrayMessages=[];
        arrayMessages.push(this.state.messageUser);
        this.setState({
            all_messages: arrayMessages
        })
    }
    onSendForm = (e) => {
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
        this.pushToAllMessage(e);
    }
    render () {
        return (
            <div>
                <div className="container">
                    <div className="py-5 text-center">
                        <h2>Чат программа на REACT</h2>
                        <p className="lead">Укажите ваше имя и начинайте переписку</p>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h3>Форма сообщений</h3>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                            <form 
                                id="messForm" 
                                action='http://localhost:8000' 
                                method="POST"
                                onSubmit={(e) => this.onSendForm(e)}
                            >                                
                                <label htmlFor="name">Имя</label>
                                <input type="text" 
                                    name="name" 
                                    id="name"
                                    className="form-control"
                                    placeholder="Введите имя"
                                    onChange={this.onName}
                                />
                                <br/>
                                <label htmlFor="message">Сообщения</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    className="form-control"
                                    placeholder="Введите сообщение"
                                    onChange={this.onMessage}
                                />
                                <br/>
                                <button 
                                    onClick={(e) => this.onSendForm(e)}
                                    className="btn btn-danger"
                                >Отправить</button>
                            </form>
                        </div>
                        <div className="col-6">
                            <h3>Сообщения</h3>
                            <div id="all_mess" ref={this.elementMessages}>
                                {/* сюда вставлять сообщения */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Header;
import React from 'react';
import { subscribeToMessager } from '../../api'
const INITIAL_STATE = {
    message:"No message",
    name: "No name",

}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE };
    }
      onMessage = (e) => {
        this.setState({
          message:e.target.value
        })
      }
      onName = (e) => {
        this.setState({
          name: e.target.value
        })
      }
      onSendForm = (e) => {
        e.preventDefault();
        subscribeToMessager({
            name: this.state.name,
            message: this.state.message,
        })
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
                            <form id="messForm">
                                <label htmlFor="name">Имя</label>
                                <input type="text" 
                                    name="name" 
                                    id="name"
                                    className="form-control"
                                    placeholder="Введите имя"
                                    onChange={this.onName}
                                />
                                <br/>
                                <label for="message">Сообщения</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    className="form-control"
                                    placeholder="Введите сообщение"
                                    onChange={this.onMessage}
                                />
                                <br/>
                                <button 
                                    onClick={(e)=>this.onSendForm(e)} 
                                    className="btn btn-danger"
                                >Отправить</button>
                            </form>
                        </div>
                        <div className="col-6">
                            <h3>Сообщения</h3>
                            <div id="all_mess"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Header;
import React from 'react';
import Message from './Message';

const Messages = ({ messages }) => {
    const renderMessages = () => {
        let render = messages.map((msg, i) => {
            return (
                <div key={i}> 
                    <Message 
                        userName={msg.name} 
                        message={msg.message}
                        dateTime={msg.date}
                    />
                </div>
            )
        })
        return render
    }
 return (
    <div className="col-6">
        <h3>Сообщения</h3>
        <div>
            {renderMessages()}
        </div>
    </div>
 )
}

export default Messages;
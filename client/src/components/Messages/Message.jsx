import React from 'react';

const Message = ({ userName, message, dateTime }) => {
    return (
        <div className="d-flex justify-content-between">  
            <div>
                <b>{ userName }: </b>
                <span>
                    {message}
                </span>
            </div>
            <i>{dateTime}</i>
        </div>
    )
}

export default Message;
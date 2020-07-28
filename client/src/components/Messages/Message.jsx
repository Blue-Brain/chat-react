import React from 'react';

const Message = ({ userName, message }) => {
    return (
        <>
            <b>{ userName }: </b>
            <span>
                {message}
            </span>
        </>
    )
}

export default Message;
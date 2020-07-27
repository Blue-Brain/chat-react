import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Messages from '../Messages/Messages';
import FormSend from '../FormSend/FormSend';

const App = () => {
    return (
      <div className="container">
        <Header/>
        <div className="row">
          <FormSend />
          <Messages />
        </div>
      </div>
    );
  }

export default App;

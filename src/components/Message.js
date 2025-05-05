import React from 'react';
import './Message.js';
import './ChatApp.css';


const Message = ({ message }) => {
  return (
    <div className={`message ${message.sender}`}>
      <div className="message-text">{message.text}</div>
    </div>
  );
};

export default Message;

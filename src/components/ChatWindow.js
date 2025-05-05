//import React from 'react'; 
//import React, { useEffect, useRef } from 'react';
//import Message from './Message';
//import './ChatWindow.js';

import React, { useEffect, useRef } from 'react';
import Message from './Message';
import './ChatWindow.js';

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef} /> {/* Elemento para referenciar o final da lista */}
    </div>
  );
};

export default ChatWindow;

/*const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};


export default ChatWindow;
*/
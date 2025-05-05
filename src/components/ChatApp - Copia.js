import React, { useState } from 'react';
//import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import './ChatApp.js';
import './ChatApp.css';

/*const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, user: 'user' }]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBotResponse = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, user: 'bot' }]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user === 'user') {
      setTimeout(() => handleBotResponse('Resposta do bot para: ' + messages[messages.length - 1].text), 1000);
    }
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
*/


/*const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, user: 'user' }]);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Adiciona a rolagem aqui
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user === 'user') {
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Resposta do bot para: ' + messages[messages.length - 1].text, user: 'bot' }
        ]);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Adiciona a rolagem aqui para resposta do bot
      }, 1000);
    }
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;*/


/*const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

*/


const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    const userMessage = { sender: 'user', text: message };
    const botMessage = { sender: 'bot', text: 'Esta é uma resposta automática.' };
    
    setMessages([...messages, userMessage, botMessage]);
  };

  return (
    <div className="chat-app">
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

//var posicao = localStorage.getItem('posicaoScroll');

/* Se existir uma opção salva seta o scroll nela */
//if(posicao) {
    /* Timeout necessário para funcionar no Chrome */
//    setTimeout(function() {
//        window.scrollTo(0, posicao);
//    }, 1);
//}

/* Verifica mudanças no Scroll e salva no localStorage a posição */
//window.onscroll = function (e) {
//    posicao = window.scrollY;
//    localStorage.setItem('posicaoScroll', JSON.stringify(posicao));
//}

export default ChatApp;

import React, { useState } from 'react';
//import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import './ChatApp.js';
//import './ChatApp.css';
import axios from 'axios';  // Importa axios

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  //
  const handleSendMessage = async (message) => {
  const userMessage = { sender: 'user', text: message };
  try {
   const response = await axios.post('/send_message', { message });  // Envia a mensagem ao backend
   if (response.status === 200) { 
     // console.log('Resposta do backend:', response); para ver com f12 do navegador
     const botMessage = { sender: 'bot', text: response.data.response }; // Recebe a resposta do backend
     setMessages([...messages, userMessage, botMessage]);
   }

} catch (error) {
  if (error.response && error.response.status === 403) { // Data Limite de uso foi atingida !!!
    // Trata o erro 403 especificamente
    const errorMessage = { sender: 'bot', text: 'Erro na leitura !.' };
    setMessages([...messages, userMessage, errorMessage]); // Adiciona a mensagem de erro à lista
    //
  }  
  console.error("Erro ao enviar a mensagem:", error);
}
/* */
};
  return (
    <div className="chat-app">
      <div class="header">
        <img src="LogoChat.jpg" alt="Imagem no Topo"/>
    </div>
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

var posicao = localStorage.getItem('posicaoScroll');

/* Se existir uma opção salva seta o scroll nela */
if(posicao) {
    /* Timeout necessário para funcionar no Chrome */
    setTimeout(function() {
        window.scrollTo(0, posicao);
    }, 1);
}

/* Verifica mudanças no Scroll e salva no localStorage a posição */
window.onscroll = function (e) {
    posicao = window.scrollY;
    localStorage.setItem('posicaoScroll', JSON.stringify(posicao));
}

export default ChatApp;

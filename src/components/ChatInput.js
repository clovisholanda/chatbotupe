import React, { useState, useRef } from 'react';
import './ChatInput.js';
import './ChatApp.css';

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  //
  const [isListening, setIsListening] = useState(false);
  const sendButtonRef = useRef(null); // Referência para o botão "Enviar"

  // Função para iniciar o reconhecimento de voz
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "pt-BR"; // Define o idioma para português do Brasil
    recognition.continuous = false; // Parar após uma única frase
    recognition.interimResults = false; // Não mostrar resultados parciais

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Captura o texto transcrito
      setInput(transcript); // Atualiza o textarea com o texto do áudio
      // comando para clicar no botão 
      // Aguarda a atualização do estado antes de enviar automaticamente
      setTimeout(() => {
        if (sendButtonRef.current) {
          sendButtonRef.current.click(); // Dispara um clique automático no botão "Enviar"
        }
      }, 500);
    };

    recognition.onerror = (event) => {
      console.error("Erro no reconhecimento de voz:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start(); // Inicia o reconhecimento de voz
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    } 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evita a quebra de linha ao pressionar Enter sem Shift
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite uma pergunta ou se quiser falar click no botão..."
        style={{ width: '100%', resize: 'none', height: '55px', boxSizing: 'border-box'}}
      />
      <button type="submit" ref={sendButtonRef}>Enviar</button>
      <button type="button" onClick={startListening} disabled={isListening}>
        🎤 {isListening ? "Ouvindo..." : "Falar"}
      </button>
      </form>
  );
};

export default ChatInput;

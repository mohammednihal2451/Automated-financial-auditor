import React, { useState } from 'react';
import './Chatbot.css'; // We'll create this for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with your financial auditing today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      // Simple echo response for now
      setTimeout(() => {
        const botResponse = { text: `You said: "${input}". How can I assist further?`, sender: 'bot' };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Financial Auditor Chatbot</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
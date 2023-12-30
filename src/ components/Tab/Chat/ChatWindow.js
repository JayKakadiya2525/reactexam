// ChatWindow.jsx
import React, { useState } from 'react';

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendClick = () => {
    const trimmedMessage = messageInput.trim();

    if (trimmedMessage !== '') {
      onSendMessage(trimmedMessage);
      setMessageInput('');
    }
  };

  return (
    <div key={selectedUser.id}>
      <h2>{`Chat with ${selectedUser.username}`}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{`${msg.sender || 'Unknown'}: ${msg.message}`}</div>
        ))}
      </div>
      <div>
        <input type="text" value={messageInput} onChange={handleInputChange} />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

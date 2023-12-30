import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import { getUserId } from '../../../auth/auth';

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('newMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/userProfiles')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching user profiles:', error.message));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    socket.emit('joinRoom', user.id);
  };

  const handleSendMessage = (message) => {
    if (message.trim() === '' || !socket || !selectedUser) {
      console.error('Sender ID or Receiver ID is undefined');
      return;
    }

    const senderId = getUserId(); // Set the sender ID to the logged-in user ID
    const receiverId = selectedUser.id; // Replace with the correct receiver ID property

    socket.emit('sendMessage', {
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
  };

  return (
    <div>
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatApp;
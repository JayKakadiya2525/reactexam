import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  const handleUserClick = (user) => {
    onSelectUser(user);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

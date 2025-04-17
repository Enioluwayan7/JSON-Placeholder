import React from 'react';
import { AtSign, Globe, Phone } from "lucide-react";
import '../css/UsersList.css';

function UsersList({ users, onUserClick }) {
  return (
    <div className="users-grid">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-card"
          onClick={() => onUserClick(user)}
        >
          <div className="card-header">
            <h3 className="card-title">{user.name}</h3>
            <p className="username">@{user.username}</p>
          </div>
          <div className="card-content">
            <div className="info-item">
              <AtSign className="icon" />
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <Phone className="icon" />
              <span>{user.phone}</span>
            </div>
            <div className="info-item">
              <Globe className="icon" />
              <span>{user.website}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
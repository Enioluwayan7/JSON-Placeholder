import React from 'react';
import { X, MapPin, Building } from "lucide-react";
import '../css/UserDetails.css';

function UserDetails({ user, onClose }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <h2 className="card-title">{user.name}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close details">
            <X className="icon-small" />
          </button>
        </div>
        <p className="username">@{user.username}</p>
      </div>
      <div className="card-content">
        <div className="info-section">
          <h3 className="section-title">Contact Information:</h3>
          <div className="info-list">
            <p>
              <span className="label">Email:</span> {user.email}
            </p>
            <p>
              <span className="label">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="label">Website:</span> {user.website}
            </p>
          </div>
        </div>
        <div className="info-section border-top">
          <h3 className="section-title with-icon">
            <MapPin className="icon-small" />
            Address
          </h3>
          <div className="info-list">
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
        <div className="info-section border-top">
          <h3 className="section-title with-icon">
            <Building className="icon-small" />
            Company
          </h3>
          <div className="info-list">
            <p>
              <span className="label">Name:</span> {user.company.name}
            </p>
            <p>
              <span className="label">Catchphrase:</span> {user.company.catchPhrase}
            </p>
            <p>
              <span className="label">Business:</span> {user.company.bs}
            </p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <p className="user-id">User ID: {user.id}</p>
      </div>
    </div>
  );
}

export default UserDetails;
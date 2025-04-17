import React from "react";
import { X } from "lucide-react";
import "../css/PostDetails.css";

export default function PostDetails({ post, users, onClose }) {
  const user = users.find((user) => user.id === post.userId);
  
  return (
    <div className="post-details-card">
      <div className="post-details-header">
        <div className="post-details-header-content">
          <h2 className="post-details-title">{post.title}</h2>
          <button 
            className="close-button"
            onClick={onClose} 
            aria-label="Close details"
          >
            <X className="close-icon" />
          </button>
        </div>
      </div>
      
      <div className="post-details-content">
        <div className="post-content-section">
          <h3 className="section-title">Content:</h3>
          <p className="post-body">{post.body}</p>
        </div>
        
        {user && (
          <div className="author-section">
            <h3 className="section-title">Author:</h3>
            <div className="author-details">
              <p>
                <span className="detail-label">Name:</span> {user.name}
              </p>
              <p>
                <span className="detail-label">Email:</span> {user.email}
              </p>
              <p>
                <span className="detail-label">Company:</span> {user.company.name}
              </p>
              <p>
                <span className="detail-label">Website:</span> {user.website}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="post-details-footer">
        <p className="post-id">Post ID: {post.id}</p>
      </div>
    </div>
  );
}
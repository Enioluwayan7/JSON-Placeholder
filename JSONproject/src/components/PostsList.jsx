import React from "react";
import { Trash } from "lucide-react";
import "../css/PostsList.css";

export default function PostsList({ posts, users, onPostClick, onDeletePost }) {
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="post-header-content">
              <h3 
                className="post-title"
                onClick={() => onPostClick(post)}
              >
                {post.title}
              </h3>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePost(post.id);
                }}
                aria-label="Delete post"
              >
                <Trash className="trash-icon" />
              </button>
            </div>
            <div className="post-author">By: {getUserName(post.userId)}</div>
          </div>
          <div className="post-content">
            <p className="post-body">{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
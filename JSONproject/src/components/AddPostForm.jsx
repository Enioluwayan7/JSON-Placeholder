import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { createPost } from "../lib/api"; 
import "../css/AddPostsForm.css";

export default function AddPostForm({ onAddPost, users }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: title.trim() ? "" : "Title is required",
      body: body.trim() ? "" : "Content is required",
      userId: userId ? "" : "Author is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const newPost = {
        title,
        body,
        userId: Number.parseInt(userId),
      };

      const createdPost = await createPost(newPost);
      onAddPost(createdPost);

      // Reset form
      setTitle("");
      setBody("");
      setUserId("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`add-post-form ${isOpen ? "open" : ""}`}>
      <button 
        className="add-post-button" 
        onClick={toggleCollapsible} 
        type="button"
      >
        <PlusCircle className="plus-icon" />
        {isOpen ? "Cancel" : "Add New Post"}
      </button>
      
      <div className="collapsible-content">
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className={`form-input ${errors.title ? "input-error" : ""}`}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter post content"
              rows={4}
              className={`form-textarea ${errors.body ? "input-error" : ""}`}
            />
            {errors.body && <p className="error-message">{errors.body}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="userId" className="form-label">
              Author
            </label>
            <div className={`select-wrapper ${errors.userId ? "input-error" : ""}`}>
              <select
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  Select author
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.userId && <p className="error-message">{errors.userId}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="submit-button"
          >
            {isSubmitting ? "Adding..." : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
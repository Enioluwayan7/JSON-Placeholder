import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import PostsList from "./PostsList";
import PostDetails from "./PostDetails";
import AddPostForm from "./AddPostForm";
import Pagination from "./Pagination";
import { fetchPosts, fetchUsers, deletePost } from "../lib/api";
import "../css/PostsContainer.css";

export default function PostsContainer() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
        setPosts(postsData);
        setFilteredPosts(postsData);
        setUsers(usersData);
        setError("");
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        toast.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter posts based on search term and user filter
    let result = posts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) => post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term)
      );
    }

    if (userFilter && userFilter !== "all") {
      result = result.filter((post) => post.userId.toString() === userFilter);
    }

    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, userFilter, posts]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetails = () => {
    setSelectedPost(null);
  };

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    toast.success("Post added successfully (simulated)");
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
      toast.success("Post deleted successfully (simulated)");
    } catch (err) {
      toast.error("Failed to delete post. Please try again.");
    }
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) {
    return <div className="loading-container">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {/* Add Toaster component for toast notifications */}
      <Toaster position="top-right" />
      
      <div className="posts-list-section">
        <div className="search-filter-section">
          <h2 className="section-title">Posts</h2>
          <div className="search-filter-controls">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="select-wrapper">
              <select 
                value={userFilter} 
                onChange={(e) => setUserFilter(e.target.value)}
                className="user-filter-select"
              >
                <option value="all">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AddPostForm onAddPost={handleAddPost} users={users} />
        </div>

        <PostsList 
          posts={currentPosts} 
          users={users} 
          onPostClick={handlePostClick} 
          onDeletePost={handleDeletePost} 
        />

        {filteredPosts.length > postsPerPage && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}

        {filteredPosts.length === 0 && (
          <div className="no-posts-message">
            No posts found. Try adjusting your search or filter.
          </div>
        )}
      </div>

      <div className="post-details-section">
        {selectedPost ? (
          <PostDetails post={selectedPost} users={users} onClose={handleCloseDetails} />
        ) : (
          <div className="post-details-placeholder">
            <h3 className="details-title">Post Details</h3>
            <p className="details-instruction">Click on a post title to view its details here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
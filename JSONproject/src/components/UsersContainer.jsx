"use client"
import { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import UserDetails from "../components/UserDetails";
import { fetchUsers } from "../lib/api";
import "../css/UsersContainer.css";

export default function UsersContainer() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Simulated toast functionality
  const toast = {
    error: (message) => {
      alert(message);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const usersData = await fetchUsers()
        setUsers(usersData)
        setFilteredUsers(usersData)
        setError("")
      } catch (err) {
        setError("Failed to load users. Please try again later.")
        toast.error("Failed to load users. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.username.toLowerCase().includes(term),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
  }

  if (loading) {
    return <div className="loading-container">Loading users...</div>
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="users-grid">
      <div className="users-list-container">
        <div className="search-container">
          <h2 className="heading">Users</h2>
          <input 
            className="search-input"
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <UsersList users={filteredUsers} onUserClick={handleUserClick} />
        {filteredUsers.length === 0 && (
          <div className="no-users-message">No users found. Try adjusting your search.</div>
        )}
      </div>
      <div className="details-container">
        {selectedUser ? (
          <UserDetails user={selectedUser} onClose={handleCloseDetails} />
        ) : (
          <div className="empty-details">
            <h3 className="empty-details-heading">User Details</h3>
            <p className="empty-details-text">Click on a user to view their details here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
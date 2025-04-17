const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch all posts
export async function fetchPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

// Fetch a single post by ID
export async function fetchPostById(id) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with ID ${id}`);
  }
  return response.json();
}

// Create a new post
export async function createPost(post) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  // JSONPlaceholder returns the created post with an ID
  const createdPost = await response.json();
  // For simulation purposes, we'll add a random ID since JSONPlaceholder
  // always returns ID 101 for new posts
  return {
    ...createdPost,
    id: Math.floor(Math.random() * 1000) + 100, // Random ID between 100-1100
  };
}

// Delete a post
export async function deletePost(id) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete post with ID ${id}`);
  }
}

// Fetch all users
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// Fetch a single user by ID
export async function fetchUserById(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
  return response.json();
}
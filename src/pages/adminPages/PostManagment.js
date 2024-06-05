import React, { useState, useEffect } from 'react';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = 'your_token_here'; // Replace 'your_token_here' with your actual token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      const token = 'your_token_here'; // Replace 'your_token_here' with your actual token
      const response = await fetch(`https://your-backend-api.com/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-2xl font-bold mb-4">Post Management</h1>
    {error && <div className="text-red-500">{error}</div>}
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post._id}>
            <td className="border px-4 py-2">{post.title}</td>
            <td className="border px-4 py-2">{post.description}</td>
            <td className="border px-4 py-2">{post.type}</td>
            <td className="border px-4 py-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deletePost(post._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default PostManagement;

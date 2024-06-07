import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    photos: [],
    description: "",
    type: "news"
  });
  const [error, setError] = useState(null);
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    photos: [],
    description: "",
    type: "news"
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
  }, [token]);

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
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

  const startEditPost = (post) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      photos: post.photos,
      description: post.description,
      type: post.type
    });
    setShowEditForm(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const savePost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
      setShowEditForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleNewPostFormChange = (e) => {
    const { name, value } = e.target;
    setNewPostForm({ ...newPostForm, [name]: value });
  };

  const addNewPost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPostForm)
      });
      if (!response.ok) {
        throw new Error('Failed to add new post');
      }
      const newPost = await response.json();

      setPosts([...posts, newPost]);
      setShowAddForm(false);
      setNewPostForm({
        title: "",
        photos: [],
        description: "",
        type: "news"
      });
    } catch (error) {
      console.error('Error adding new post:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Post Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => setShowAddForm(true)}
        >
          Add Post
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => startEditPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Post Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Add Post</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewPost();
              }}
              className="p-6 space-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="newTitle" className="text-sm font-semibold text-gray-800">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="newTitle"
                  value={newPostForm.title}
                  onChange={handleNewPostFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPhotos" className="text-sm font-semibold text-gray-800">
                  Photos:
                </label>
                <input
                  type="text"
                  name="photos"
                  id="newPhotos"
                  value={newPostForm.photos}
                  onChange={handleNewPostFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newDescription" className="text-sm font-semibold text-gray-800">
                  Description:
                </label>
                <textarea
                  name="description"
                  id="newDescription"
                  value={newPostForm.description}
                  onChange={handleNewPostFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newType" className="text-sm font-semibold text-gray-800">
                  Type:
                </label>
                <select
                  name="type"
                  id="newType"
                  value={newPostForm.type}
                  onChange={handleNewPostFormChange}
                  className="input"
                >
                  <option value="news">News</option>
                  <option value="activity">Activity</option>
                  <option value="post">Post</option>
                  <option value="discounts">Discounts</option>
                  <option value="visits">Visits</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  Add Post
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white hover:bg-gray-700 px-4 py-2 rounded ml-2"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                savePost();
              }}
              className="p-6 space-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="editTitle" className="text-sm font-semibold text-gray-800">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="editTitle"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="editPhotos" className="text-sm font-semibold text-gray-800">
                  Photos:
                </label>
                <input
                  type="text"
                  name="photos"
                  id="editPhotos"
                  value={editForm.photos}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="editDescription" className="text-sm font-semibold text-gray-800">
                  Description:
                </label>
                <textarea
                  name="description"
                  id="editDescription"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="editType" className="text-sm font-semibold text-gray-800">
                  Type:
                </label>
                <select
                  name="type"
                  id="editType"
                  value={editForm.type}
                  onChange={handleEditFormChange}
                  className="input"
                >
                  <option value="news">News</option>
                  <option value="activity">Activity</option>
                  <option value="post">Post</option>
                  <option value="discounts">Discounts</option>
                  <option value="visits">Visits</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white hover:bg-gray-700 px-4 py-2 rounded ml-2"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;

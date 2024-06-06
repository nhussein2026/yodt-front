import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch users from backend
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, [token]);

  const deleteUser = (userId) => {
    // Delete user by ID
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      // Remove deleted user from state
      setUsers(users.filter(user => user._id !== userId));
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  const startEditUser = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${editingUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editForm)
    })
    .then(response => response.json())
    .then(updatedUser => {
      // Update users state with updated user
      setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      setEditingUser(null);
    })
    .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {editingUser ? (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={(e) => { e.preventDefault(); saveUser(); }}>
            <label>
              Name:
              <input type="text" name="name" value={editForm.name} onChange={handleEditFormChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editForm.email} onChange={handleEditFormChange} />
            </label>
            <label>
              Role:
              <input type="text" name="role" value={editForm.role} onChange={handleEditFormChange} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => startEditUser(user)}>
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;

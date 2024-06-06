import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    email: '',
    universityName: '',
    studentId: '',
    studyingYear: '',
    phoneNumber: '',
    membershipId: '',
    role: '',
    isConfirmed: false,
    volunteeringHours: 0,
    applicationStatus: 'Submitted',
    trackingCode: '',
  });
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
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email,
      universityName: user.universityName,
      studentId: user.studentId,
      studyingYear: user.studyingYear,
      phoneNumber: user.phoneNumber,
      membershipId: user.membershipId,
      role: user.role,
      isConfirmed: user.isConfirmed,
      volunteeringHours: user.volunteeringHours,
      applicationStatus: user.applicationStatus,
      trackingCode: user.trackingCode,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
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
              Username:
              <input type="text" name="username" value={editForm.username} onChange={handleEditFormChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editForm.email} onChange={handleEditFormChange} />
            </label>
            <label>
              University Name:
              <input type="text" name="universityName" value={editForm.universityName} onChange={handleEditFormChange} />
            </label>
            <label>
              Student ID:
              <input type="text" name="studentId" value={editForm.studentId} onChange={handleEditFormChange} />
            </label>
            <label>
              Studying Year:
              <input type="number" name="studyingYear" value={editForm.studyingYear} onChange={handleEditFormChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" value={editForm.phoneNumber} onChange={handleEditFormChange} />
            </label>
            <label>
              Membership ID:
              <input type="text" name="membershipId" value={editForm.membershipId} onChange={handleEditFormChange} />
            </label>
            <label>
              Role:
              <input type="text" name="role" value={editForm.role} onChange={handleEditFormChange} />
            </label>
            <label>
              Confirmed:
              <input type="checkbox" name="isConfirmed" checked={editForm.isConfirmed} onChange={handleEditFormChange} />
            </label>
            <label>
              Volunteering Hours:
              <input type="number" name="volunteeringHours" value={editForm.volunteeringHours} onChange={handleEditFormChange} />
            </label>
            <label>
              Application Status:
              <select name="applicationStatus" value={editForm.applicationStatus} onChange={handleEditFormChange}>
                <option value="Submitted">Submitted</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
            <label>
              Tracking Code:
              <input type="text" name="trackingCode" value={editForm.trackingCode} onChange={handleEditFormChange} />
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
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">University Name</th>
              <th className="border px-4 py-2">Student ID</th>
              <th className="border px-4 py-2">Studying Year</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">Membership ID</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Confirmed</th>
              <th className="border px-4 py-2">Volunteering Hours</th>
              <th className="border px-4 py-2">Application Status</th>
              <th className="border px-4 py-2">Tracking Code</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.universityName}</td>
                <td className="border px-4 py-2">{user.studentId}</td>
                <td className="border px-4 py-2">{user.studyingYear}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">{user.membershipId}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.isConfirmed ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">{user.volunteeringHours}</td>
                <td className="border px-4 py-2">{user.applicationStatus}</td>
                <td className="border px-4 py-2">{user.trackingCode}</td>
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

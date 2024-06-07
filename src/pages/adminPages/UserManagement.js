import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
    universityName: "",
    studentId: "",
    studyingYear: "",
    phoneNumber: "",
    membershipId: "",
    role: "",
    isConfirmed: false,
    volunteeringHours: 0,
    applicationStatus: "Submitted",
    trackingCode: "",
  });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch users from backend
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const deleteUser = (userId) => {
    // Delete user by ID
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        // Remove deleted user from state
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
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
    setEditForm({ ...editForm, [name]: type === "checkbox" ? checked : value });
  };

  const saveUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${editingUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        // Update users state with updated user
        setUsers(
          users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setEditingUser(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {editingUser ? (
        <div className="max-w-md mx-auto bg-[#FFFDFD] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-[#BB2423]">Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUser();
            }}
            className="p-6 space-y-4"
          >
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={editForm.name}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={editForm.username}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={editForm.email}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="universityName"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                University Name:
              </label>
              <input
                type="text"
                name="universityName"
                id="universityName"
                value={editForm.universityName}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="studentId"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Student ID:
              </label>
              <input
                type="text"
                name="studentId"
                id="studentId"
                value={editForm.studentId}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="studyingYear"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Studying Year:
              </label>
              <input
                type="number"
                name="studyingYear"
                id="studyingYear"
                value={editForm.studyingYear}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Phone Number:
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="membershipId"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Membership ID:
              </label>
              <input
                type="text"
                name="membershipId"
                id="membershipId"
                value={editForm.membershipId}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Role:
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={editForm.role}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="isConfirmed"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Confirmed:
              </label>
              <input
                type="checkbox"
                name="isConfirmed"
                id="isConfirmed"
                checked={editForm.isConfirmed}
                onChange={handleEditFormChange}
                className="ml-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="volunteeringHours"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Volunteering Hours:
              </label>
              <input
                type="number"
                name="volunteeringHours"
                id="volunteeringHours"
                value={editForm.volunteeringHours}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="applicationStatus"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Application Status:
              </label>
              <select
                name="applicationStatus"
                id="applicationStatus"
                value={editForm.applicationStatus}
                onChange={handleEditFormChange}
                className="input"
              >
                <option value="Submitted">Submitted</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="trackingCode"
                className="text-sm font-semibold text-[#2f2f2f]"
              >
                Tracking Code:
              </label>
              <input
                type="text"
                name="trackingCode"
                id="trackingCode"
                value={editForm.trackingCode}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#BB2423] text-white hover:bg-[#2f2f2f] px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-gray-800 hover:bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="border px-4 py-2 font-bold">ID</th>
                <th className="border px-4 py-2 font-bold">Name</th>
                <th className="border px-4 py-2 font-bold">Username</th>
                <th className="border px-4 py-2 font-bold">Email</th>
                <th className="border px-4 py-2 font-bold">University Name</th>
                <th className="border px-2 py-1 font-bold">Student ID</th>
                <th className="border px-4 py-2 font-bold">Studying Year</th>
                <th className="border px-4 py-2 font-bold">Phone Number</th>
                <th className="border px-4 py-2 font-bold">Membership ID</th>
                <th className="border px-4 py-2 font-bold">Role</th>
                <th className="border px-2 py-1 font-bold">Confirmed</th>
                <th className="border px-4 py-2 font-bold">
                  Volunteering Hours
                </th>
                <th className="border px-4 py-2 font-bold">
                  Application Status
                </th>
                <th className="border px-4 py-2 font-bold">Tracking Code</th>
                <th className="border px-4 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user._id}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.universityName}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.studentId}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.studyingYear}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.phoneNumber}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.membershipId}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.isConfirmed ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.volunteeringHours}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.applicationStatus}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {user.trackingCode}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => startEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

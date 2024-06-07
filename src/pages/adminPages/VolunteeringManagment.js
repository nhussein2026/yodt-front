import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const VolunteeringManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    requirements: "",
    contactInformation: ""
  });
  const [error, setError] = useState(null);
  const [newVolunteerForm, setNewVolunteerForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    requirements: "",
    contactInformation: ""
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/volunteering`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers");
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVolunteers();
  }, [token]);

  const deleteVolunteer = async (volunteerId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/volunteering/${volunteerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete volunteer");
      }
      setVolunteers(
        volunteers.filter((volunteer) => volunteer._id !== volunteerId)
      );
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  const startEditVolunteer = (volunteer) => {
    setEditingVolunteer(volunteer);
    setEditForm({
      title: volunteer.title,
      description: volunteer.description,
      location: volunteer.location,
      date: volunteer.date,
      time: volunteer.time,
      requirements: volunteer.requirements,
      contactInformation: volunteer.contactInformation
    });
    setShowEditForm(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveVolunteer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/volunteering/${editingVolunteer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update volunteer");
      }
      const updatedVolunteer = await response.json();
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === updatedVolunteer._id ? updatedVolunteer : volunteer
        )
      );
      setShowEditForm(false);
      setEditingVolunteer(null);
    } catch (error) {
      console.error("Error updating volunteer:", error);
    }
  };

  const handleNewVolunteerFormChange = (e) => {
    const { name, value } = e.target;
    setNewVolunteerForm({ ...newVolunteerForm, [name]: value });
  };

  const addNewVolunteer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/volunteering`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newVolunteerForm),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add new volunteer");
      }
      const newVolunteer = await response.json();
      setVolunteers([...volunteers, newVolunteer]);
      setShowAddForm(false);
      setNewVolunteerForm({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        requirements: "",
        contactInformation: ""
      });
    } catch (error) {
      console.error("Error adding new volunteer:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Volunteering Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => setShowAddForm(true)}
        >
          Add Volunteer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => startEditVolunteer(volunteer)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteVolunteer(volunteer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Volunteer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Add Volunteer</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewVolunteer();
              }}
              className="p-6 space-y-4"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="newTitle"
                  className="text-sm font-semibold text-gray-800"
                >
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="newTitle"
                  value={newVolunteerForm.title}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newDescription"
                  className="text-sm font-semibold text-gray-800"
                >
                  Description:
                </label>
                <textarea
                  name="description"
                  id="newDescription"
                  value={newVolunteerForm.description}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newLocation"
                  className="text-sm font-semibold text-gray-800"
                >
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  id="newLocation"
                  value={newVolunteerForm.location}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newDate"
                  className="text-sm font-semibold text-gray-800"
                >
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="newDate"
                  value={newVolunteerForm.date}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newTime"
                  className="text-sm font-semibold text-gray-800"
                >
                  Time:
                </label>
                <input
                  type="time"
                  name="time"
                  id="newTime"
                  value={newVolunteerForm.time}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newRequirements"
                  className="text-sm font-semibold text-gray-800"
                >
                  Requirements:
                </label>
                <textarea
                  name="requirements"
                  id="newRequirements"
                  value={newVolunteerForm.requirements}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newContactInformation"
                  className="text-sm font-semibold text-gray-800"
                >
                  Contact Information:
                </label>
                <textarea
                  name="contactInformation"
                  id="newContactInformation"
                  value={newVolunteerForm.contactInformation}
                  onChange={handleNewVolunteerFormChange}
                  className="input"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Add Volunteer
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

      {/* Edit Volunteer Modal */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Edit Volunteer</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveVolunteer();
              }}
              className="p-6 space-y-4"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="editTitle"
                  className="text-sm font-semibold text-gray-800"
                >
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
                <label
                  htmlFor="editDescription"
                  className="text-sm font-semibold text-gray-800"
                >
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
                <label
                  htmlFor="editLocation"
                  className="text-sm font-semibold text-gray-800"
                >
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  id="editLocation"
                  value={editForm.location}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="editDate"
                  className="text-sm font-semibold text-gray-800"
                >
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  id="editDate"
                  value={editForm.date}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="editTime"
                  className="text-sm font-semibold text-gray-800"
                >
                  Time:
                </label>
                <input
                  type="time"
                  name="time"
                  id="editTime"
                  value={editForm.time}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="editRequirements"
                  className="text-sm font-semibold text-gray-800"
                >
                  Requirements:
                </label>
                <textarea
                  name="requirements"
                  id="editRequirements"
                  value={editForm.requirements}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="editContactInformation"
                  className="text-sm font-semibold text-gray-800"
                >
                  Contact Information:
                </label>
                <textarea
                  name="contactInformation"
                  id="editContactInformation"
                  value={editForm.contactInformation}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
                >
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

export default VolunteeringManagement;

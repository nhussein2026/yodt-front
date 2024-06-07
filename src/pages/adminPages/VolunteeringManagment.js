import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const VolunteeringManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [newVolunteerForm, setNewVolunteerForm] = useState({
    title: "",
    description: "",
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
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveVolunteer = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/volunteering/${editingVolunteer._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      }
    )
      .then((response) => response.json())
      .then((updatedVolunteer) => {
        setVolunteers(
          volunteers.map((volunteer) =>
            volunteer._id === updatedVolunteer._id
              ? updatedVolunteer
              : volunteer
          )
        );
        setEditingVolunteer(null);
      })
      .catch((error) => console.error("Error updating volunteer:", error));
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
      setNewVolunteerForm({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding new volunteer:", error);
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Volunteering Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      {editingVolunteer ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            Edit Volunteer
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveVolunteer();
            }}
            className="p-6 space-y-4"
          >
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-gray-800"
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={editForm.title}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-800"
              >
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                value={editForm.description}
                onChange={handleEditFormChange}
                className="input"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingVolunteer(null)}
                className="bg-gray-400 text-gray-800 hover:bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
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
      )}
  
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Add Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default VolunteeringManagement;

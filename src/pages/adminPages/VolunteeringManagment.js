import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const VolunteeringManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/volunteering`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch volunteers');
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVolunteers();
  }, []);

  const deleteVolunteer = async (volunteerId) => {
    try {
      const token = 'your_token_here'; // Replace 'your_token_here' with your actual token
      const response = await fetch(`https://your-backend-api.com/volunteers/${volunteerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete volunteer');
      }
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== volunteerId));
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Volunteering Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(volunteers) && volunteers.map(volunteer => (
            <tr key={volunteer.id}>
              <td className="border px-4 py-2">{volunteer._id}</td>
              <td className="border px-4 py-2">{volunteer.title}</td>
              <td className="border px-4 py-2">{volunteer.description}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteVolunteer(volunteer.id)}>
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

export default VolunteeringManagement;

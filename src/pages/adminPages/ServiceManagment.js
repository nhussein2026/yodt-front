import React, { useState, useEffect } from 'react';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from backend
    fetch(`${process.env.REACT_APP_API_URL}/services`)
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const deleteService = (serviceId) => {
    // Delete service by ID
    fetch(`${process.env.REACT_APP_API_URL}/services/${serviceId}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Remove deleted service from state
      setServices(services.filter(service => service.id !== serviceId));
    })
    .catch(error => console.error('Error deleting service:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Service Management</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td className="border px-4 py-2">{service._id}</td>
              <td className="border px-4 py-2">{service.title}</td>
              <td className="border px-4 py-2">{service.description}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteService(service.id)}>
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

export default ServiceManagement;

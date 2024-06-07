import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    photos: [],
    cost: "",
    requirements: "",
    conditions: ""
  });
  const [error, setError] = useState(null);
  const [newServiceForm, setNewServiceForm] = useState({
    title: "",
    description: "",
    photos: [],
    cost: "",
    requirements: "",
    conditions: ""
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/services`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchServices();
  }, [token]);

  const deleteService = async (serviceId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const startEditService = (service) => {
    setEditingService(service);
    setEditForm({
      title: service.title,
      description: service.description,
      photos: service.photos,
      cost: service.cost,
      requirements: service.requirements,
      conditions: service.conditions
    });
    setShowEditForm(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveService = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/services/${editingService._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
      const updatedService = await response.json();
      setServices(services.map(service => service._id === updatedService._id ? updatedService : service));
      setShowEditForm(false);
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleNewServiceFormChange = (e) => {
    const { name, value } = e.target;
    setNewServiceForm({ ...newServiceForm, [name]: value });
  };

  const addNewService = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newServiceForm)
      });
      if (!response.ok) {
        throw new Error('Failed to add new service');
      }
      const newService = await response.json();
      setServices([...services, newService]);
      setShowAddForm(false);
      setNewServiceForm({
        title: "",
        description: "",
        photos: [],
        cost: "",
        requirements: "",
        conditions: ""
      });
    } catch (error) {
      console.error('Error adding new service:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Service Management</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => setShowAddForm(true)}
        >
          Add Service
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
                Name
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
            {services.map(service => (
              <tr key={service._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{service._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => startEditService(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Add Service</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewService();
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
                  value={newServiceForm.title}
                  onChange={handleNewServiceFormChange}
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
                  value={newServiceForm.description}
                  onChange={handleNewServiceFormChange}
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
                  value={newServiceForm.photos}
                  onChange={handleNewServiceFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newCost" className="text-sm font-semibold text-gray-800">
                  Cost:
                </label>
                <input
                  type="text"
                  name="cost"
                  id="newCost"
                  value={newServiceForm.cost}
                  onChange={handleNewServiceFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newRequirements" className="text-sm font-semibold text-gray-800">
                  Requirements:
                </label>
                <textarea
                  name="requirements"
                  id="newRequirements"
                  value={newServiceForm.requirements}
                  onChange={handleNewServiceFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newConditions" className="text-sm font-semibold text-gray-800">
                  Conditions:
                </label>
                <textarea
                  name="conditions"
                  id="newConditions"
                  value={newServiceForm.conditions}
                  onChange={handleNewServiceFormChange}
                  className="input"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                  Add Service
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

      {/* Edit Service Modal */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveService();
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
                <label htmlFor="editCost" className="text-sm font-semibold text-gray-800">
                  Cost:
                </label>
                <input
                  type="text"
                  name="cost"
                  id="editCost"
                  value={editForm.cost}
                  onChange={handleEditFormChange}
                  className="input"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="editRequirements" className="text-sm font-semibold text-gray-800">
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
                <label htmlFor="editConditions" className="text-sm font-semibold text-gray-800">
                  Conditions:
                </label>
                <textarea
                  name="conditions"
                  id="editConditions"
                  value={editForm.conditions}
                  onChange={handleEditFormChange}
                  className="input"
                />
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

export default ServiceManagement;

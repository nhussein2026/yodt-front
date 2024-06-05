import React, { useState } from 'react';

const TrackApplication = () => {
  const [applicationStatus, setApplicationStatus] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/track-application/${trackingCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch application status');
      }
      const data = await response.json();
      setApplicationStatus(data.applicationStatus);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Error tracking application');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block mb-2 text-lg font-semibold text-gray-800">
          Enter Tracking Code:
        </label>
        <div className="flex">
          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-64 px-4 py-2 mr-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="px-6 py-2 text-lg font-semibold bg-[#be2423] text-white py-2 px-4 rounded hover:bg-[#231f20] transition duration-300"
          >
            Track Application
          </button>
        </div>
      </form>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {applicationStatus && (
        <p className="text-lg font-semibold text-green-600">Application Status: {applicationStatus}</p>
      )}
    </div>
  );
};

export default TrackApplication;

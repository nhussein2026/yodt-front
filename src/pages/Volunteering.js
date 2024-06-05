import React, { useEffect, useState } from 'react';

const Volunteering = () => {
  const [volunteeringData, setVolunteeringData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVolunteeringData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/volunteering`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to request headers
          },
        });

        if (response.status === 401) { // Handle unauthorized error
          setErrorMessage('You need to be logged in to view volunteering opportunities.');
          return;
        }

        const data = await response.json();
        setVolunteeringData(data);
      } catch (error) {
        console.error('Error fetching volunteering data:', error);
        setErrorMessage('An error occurred while fetching volunteering data.');
      }
    };

    fetchVolunteeringData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-[#be2423] mb-8">Volunteering Opportunities</h1>
      {errorMessage ? (
        <div className="text-center text-red-500">{errorMessage}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteeringData.map((opportunity) => (
            <div key={opportunity._id} className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{opportunity.title}</h2>
              <p className="mb-2"><strong>Description:</strong> {opportunity.description}</p>
              <p className="mb-2"><strong>Location:</strong> {opportunity.location}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(opportunity.date).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Time:</strong> {opportunity.time}</p>
              {opportunity.requirements && (
                <div className="mb-2">
                  <strong>Requirements:</strong>
                  <ul className="list-disc list-inside">
                    {opportunity.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p><strong>Contact Information:</strong> {opportunity.contactInformation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Volunteering;

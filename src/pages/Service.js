import React, { useState, useEffect } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/services`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleImageError = (index) => {
    const newServices = [...services];
    newServices[index].photoError = true;
    setServices(newServices);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Our Services</h1>
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-700 mb-4">{service.description}</p>
                {service.photos && service.photos.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Photos:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {service.photos.map((photo, photoIndex) => (
                        <img
                          key={photoIndex}
                          src={photo}
                          alt={`Service ${service.title} photo ${photoIndex + 1}`}
                          className={`w-full h-24 object-cover rounded ${
                            service.photoError ? "bg-gradient-to-br from-gray-400 to-gray-200" : ""
                          }`}
                          onError={() => handleImageError(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Cost:</h3>
                  <p className="text-gray-900">${service.cost}</p>
                </div>
                {service.requirements && service.requirements.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                    <ul className="list-disc list-inside">
                      {service.requirements.map((requirement, requirementIndex) => (
                        <li key={requirementIndex}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Conditions:</h3>
                  <p>{service.conditions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Profile</h1>
    {user && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded px-8 py-6">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username:</label>
            <p className="text-gray-900">{user.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Volunteering Hours:</label>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#be2423] rounded-full flex items-center justify-center text-white text-lg font-bold">
                {user.volunteeringHours}
              </div>
              <span className="ml-2">Hours</span>
            </div>
          </div>
          {/* Add more profile information here */}
        </div>
        <div className="bg-white shadow-md rounded px-8 py-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <p className="text-gray-900">*******</p> {/* Display password securely */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">University Name:</label>
            <p className="text-gray-900">{user.universityName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Student ID:</label>
            <p className="text-gray-900">{user.studentId}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Membership ID:</label>
            <p className="text-gray-900">{user.membershipId}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Studying Year:</label>
            <p className="text-gray-900">{user.studyingYear}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <p className="text-gray-900">{user.phoneNumber}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Role:</label>
            <p className="text-gray-900 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    universityName: "",
    studentId: "",
    studyingYear: "",
    phoneNumber: "",
    password: "",
  });
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.errors.message || "Registration failed");
      }

      setTrackingCode(data.trackingCode); // Set tracking code
      setSuccessMessage(
        `Registration successful! Your tracking code is ${data.trackingCode}.`
      );
      setShowMessagePanel(true);
      setFormData({
        name: "",
        username: "",
        email: "",
        universityName: "",
        studentId: "",
        studyingYear: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(trackingCode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Display success message */}
      {showMessagePanel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center relative">
            <h2 className="text-2xl font-bold mb-4">Success</h2>
            <p className="mb-4">{successMessage}</p>
            {trackingCode && (
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      to="/track-application"
                      className="bg-[#be2423] text-white py-2 px-4 rounded hover:bg-[#231f20] transition duration-300 mr-2"
                    >
                      Track Application
                    </Link>
                    <Link
                      to="/"
                      className="bg-[#be2423] text-white py-2 px-4 rounded hover:bg-[#231f20] transition duration-300"
                    >
                      Back to Home
                    </Link>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form className="space-y-4">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`block w-full p-2 border border-gray-300 rounded mt-1 ${
                  errors[field] ? "border-red-500" : ""
                }`}
                required
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#be2423] text-white py-2 px-4 rounded hover:bg-[#231f20] transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

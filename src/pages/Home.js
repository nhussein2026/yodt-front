import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import UserHomePage from "./UserHomePage";


const Home = () => {
  const [userRole, setUserRole] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/role`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserRole(response.data.user.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, [token]);
  return (
    <div className="homepage">
      {isLoggedIn ? (
        userRole === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )
      ) : (
        <UserHomePage />
      )}
    </div>
  );
};
export default Home
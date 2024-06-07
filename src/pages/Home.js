import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import UserHomePage from "./UserHomePage";


const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userRole);

 
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
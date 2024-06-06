import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import ServiceManagement from "../../pages/adminPages/ServiceManagment";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);
  const user = useSelector((state) => state.auth.user); // Get the user from the auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      switch (userRole) {
        case 'admin':
          return (
            <>
              <NavLink to="/" className="hover:text-[#be2423]">Home</NavLink>
              <NavLink to="/service-management" className="hover:text-[#be2423]">Service Management</NavLink>
              <NavLink to="/volunteering-management" className="hover:text-[#be2423]">Volunteering Management</NavLink>
              <NavLink to="/user-management" className="hover:text-[#be2423]">User Management</NavLink>
              <NavLink to="/post-management" className="hover:text-[#be2423]">Post Management</NavLink>
            </>
          );
        case 'user':
          return (
            <>
              <NavLink to="/" className="hover:text-[#be2423]">Home</NavLink>
              <NavLink to="/services" className="hover:text-[#be2423]">Services</NavLink>
              <NavLink to="/volunteering" className="hover:text-[#be2423]">Volunteering</NavLink>
              <NavLink to="/about" className="hover:text-[#be2423]">About</NavLink>
              <NavLink to="/news" className="hover:text-[#be2423]">News</NavLink>
              <NavLink to="/contact" className="hover:text-[#be2423]">Contact</NavLink>
              <NavLink to="/posts" className="hover:text-[#be2423]">Posts</NavLink>
            </>
          );
        default:
          return (
            <>
              <NavLink to="/" className="hover:text-[#be2423]">Home</NavLink>
              <NavLink to="/services" className="hover:text-[#be2423]">Services</NavLink>
              <NavLink to="/about" className="hover:text-[#be2423]">About</NavLink>
              <NavLink to="/news" className="hover:text-[#be2423]">News</NavLink>
              <NavLink to="/contact" className="hover:text-[#be2423]">Contact</NavLink>
            </>
          );
      }
    }
    return (
      <>
        <NavLink to="/" className="hover:text-[#be2423]">Home</NavLink>
        <NavLink to="/services" className="hover:text-[#be2423]">Services</NavLink>
        <NavLink to="/about" className="hover:text-[#be2423]">About</NavLink>
        <NavLink to="/news" className="hover:text-[#be2423]">News</NavLink>
        <NavLink to="/contact" className="hover:text-[#be2423]">Contact</NavLink>
      </>
    );
  };

  return (
    <nav className="bg-[#231f20] shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-2xl font-bold text-[#be2423]">
              YODT
            </NavLink>
            <div className="hidden md:flex items-center space-x-4">
              {renderLinks()}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-white hover:text-[#be2423] focus:outline-none"
                  >
                    <span className="material-icons">account_circle</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-200 rounded-md shadow-lg py-1">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Settings
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="flex items-center text-white hover:text-[#be2423] focus:outline-none"
                  >
                    <span className="material-icons">notifications</span>
                  </button>
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white text-black border border-gray-200 rounded-md shadow-lg py-1">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <div key={index} className="px-4 py-2 text-sm hover:bg-gray-100">
                            {notification.message}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-[#be2423] text-white hover:bg-[#231f20] px-4 py-2 rounded-md"
              >
                Login
              </NavLink>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#be2423] focus:outline-none"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {renderLinks()}
              {isLoggedIn && (
                <>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#be2423] hover:bg-[#231f20]"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-[#be2423] hover:bg-[#231f20]"
                  >
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-[#be2423] hover:bg-[#231f20]"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

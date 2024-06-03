import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate logged-in status

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-[#231f20] shadow-lg text-white p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  >
                    <span className="material-icons">account_circle</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </NavLink>
                      <NavLink
                        to="/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </NavLink>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                    <span className="material-icons">notifications</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-primary text-white hover:bg-secondary px-4 py-2 rounded-md"
              >
                Login
              </button>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-neutral-text hover:text-secondary"
              }
            >
              Home
            </NavLink>
            <NavLink to="/volunteering" className="mx-2 hover:text-[#be2423]">
              Volunteering
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-neutral-text hover:text-secondary"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-neutral-text hover:text-secondary"
              }
            >
              News
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-neutral-text hover:text-secondary"
              }
            >
              Contact
            </NavLink>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-secondary border-b-2 border-secondary"
                    : "block px-3 py-2 rounded-md text-base font-medium text-neutral-text hover:text-secondary hover:bg-neutral-subtle"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-secondary border-b-2 border-secondary"
                    : "block px-3 py-2 rounded-md text-base font-medium text-neutral-text hover:text-secondary hover:bg-neutral-subtle"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-secondary border-b-2 border-secondary"
                    : "block px-3 py-2 rounded-md text-base font-medium text-neutral-text hover:text-secondary hover:bg-neutral-subtle"
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-medium text-secondary border-b-2 border-secondary"
                    : "block px-3 py-2 rounded-md text-base font-medium text-neutral-text hover:text-secondary hover:bg-neutral-subtle"
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

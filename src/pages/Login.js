import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUserRole } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.errors ? data.errors[0].msg : data.msg;
        setError(errorMessage || "An error occurred while logging in");
        return;
      }

      setSuccessMessage(data.msg);
      setError("");
      //set token and user  role in Redux and localstorage
      const { token, role } = data;
      dispatch(login(token));
      dispatch(setUserRole(role));
      navigate("/");
    } catch (error) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-background">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-neutral-text">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-neutral-text mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-neutral-border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-text mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-neutral-border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#be2423] text-white hover:bg-[#231f20] py-3 rounded-lg hover:bg-primary-dark"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-neutral-subtle text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-secondary hover:text-[#be2423] underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

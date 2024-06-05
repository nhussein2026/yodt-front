import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    token: localStorage.getItem('token')  || null,
    userRole: localStorage.getItem('userRole') || null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Store token in localStorage
     
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('token'); // Remove token from localStorage when user logs out
      state.token = null;
      state.userRole = null;
      localStorage.removeItem('userRole');
    },
    // Add an optional action to update user role if needed
    setUserRole(state, action) {
      state.userRole = action.payload;
      localStorage.setItem('userRole', action.payload);
    },
  },
});

export const { login, logout, setUserRole } = authSlice.actions; // Corrected here

export default authSlice.reducer;

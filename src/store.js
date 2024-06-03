import { configureStore } from '@reduxjs/toolkit';
// import scholarReducer from './features/scholar/scholarSlice';

export const store = configureStore({
  reducer: {
    // scholar: scholarReducer,s
  },
});

export default store;

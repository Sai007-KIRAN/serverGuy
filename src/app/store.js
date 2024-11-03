// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';       // Import the auth slice
import dashboardReducer from '../features/dashboard/dashboardSlice'; // Import the dashboard slice

const store = configureStore({
  reducer: {
    auth: authReducer,                  // Add auth reducer
    dashboard: dashboardReducer,        // Add dashboard reducer
  },
});

export default store;

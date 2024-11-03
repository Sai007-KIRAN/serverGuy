import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    password: '',
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLoggedIn = true;
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('password', action.payload.password);
    },
    logout: (state) => {
      state.username = '';
      state.password = '';
      state.isLoggedIn = false;
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

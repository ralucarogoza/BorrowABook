import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuthenticated, logout, setLoading } = authSlice.actions;
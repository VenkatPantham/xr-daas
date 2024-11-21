import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, userType }) => {
    try {
      const response = await axiosInstance.post(`/login/${userType}`, {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("token_expiry", Date.now() + 3600000);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        })
      );
      localStorage.setItem("userType", userType);

      return {
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        },
        userType,
        token: response.data.token,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    userType: localStorage.getItem("userType") || null,
    token: localStorage.getItem("access_token") || null,
    isAuthenticated: Boolean(localStorage.getItem("access_token")),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userType = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

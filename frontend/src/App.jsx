import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "./styles/theme";

// Pages
import Login from "./pages/auth/Login";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDetails from "./pages/doctor/PatientDetails";
import PatientDashboard from "./pages/patient/PatientDashboard";
import XrayDetails from "./pages/common/XrayDetails";

// Components
import Navbar from "./components/common/Navbar";
import isTokenExpired from "./utils/checkTokenExpiry";
import { logout } from "./redux/slices/authSlice";

// Protected Route Component
const ProtectedRoute = ({ children, allowedUserType }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && isTokenExpired(token)) {
      dispatch(logout()); // Log the user out if the token is expired
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedUserType="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patient/:patientId"
            element={
              <ProtectedRoute allowedUserType="doctor">
                <PatientDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patient/:patientId/xray/:xrayId"
            element={
              <ProtectedRoute allowedUserType="doctor">
                <XrayDetails />
              </ProtectedRoute>
            }
          />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedUserType="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/xray/:xrayId"
            element={
              <ProtectedRoute allowedUserType="patient">
                <XrayDetails />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }

  return children;
};

export default App;

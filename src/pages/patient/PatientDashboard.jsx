import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import PatientDetails from "../../components/common/PatientDetails";
import { fetchPatientData } from "../../redux/slices/patientSlice";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: patientData, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatientData());
  }, [dispatch]);

  const handleBack = () => {
    navigate("/patient/dashboard");
  };

  const handleXrayClick = (xrayId) => {
    navigate(`/patient/xray/${xrayId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PatientDetails
      isDoctor={false}
      patientData={patientData}
      onBackClick={handleBack}
      onXrayClick={handleXrayClick}
    />
  );
};

export default PatientDashboard;

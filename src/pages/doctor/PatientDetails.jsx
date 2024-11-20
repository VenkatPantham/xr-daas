import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import PatientDetails from "../../components/common/PatientDetails";
import { fetchPatientById } from "../../redux/slices/doctorSlice";

const DoctorPatientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedPatient, loading, error } = useSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPatientById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/doctor/dashboard");
  };

  const handleXrayClick = (xrayId) => {
    navigate(`/doctor/patient/${id}/xray/${xrayId}`);
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

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <PatientDetails
      isDoctor={true}
      patientData={selectedPatient}
      onBackClick={handleBack}
      onXrayClick={handleXrayClick}
    />
  );
};

export default DoctorPatientDetails;

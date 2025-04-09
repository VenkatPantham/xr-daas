import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import PatientDetails from "../../components/common/PatientDetails";
import { fetchPatientById } from "../../redux/slices/doctorSlice";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const DoctorPatientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const { pathname } = useLocation();

  const { selectedPatient, loading, error } = useSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPatientById(patientId));
    }
  }, [dispatch, patientId]);

  const handleBack = () => {
    navigate("/doctor/dashboard");
  };

  const handleXrayClick = (xrayId) => {
    navigate(`/doctor/patient/${patientId}/xray/${xrayId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
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

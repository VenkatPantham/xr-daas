import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PatientDetails from "../../components/common/PatientDetails";
import { fetchPatientData } from "../../redux/slices/patientSlice";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data: patientData, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]);

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
    return <LoadingSpinner />;
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

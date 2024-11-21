import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import StatusChip from "../../components/common/StatusChip";
import { PageContainer } from "../../styles/components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatientXray,
  setPatientXray,
} from "../../redux/slices/patientSlice";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PatientAnalysis from "../patient/PatientAnalysis";
import DoctorAnalysis from "../doctor/DoctorAnalysis";

const ImageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const XrayImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
});

const XrayCard = styled(Card)(({ theme }) => ({
  height: "100%",
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

const AnalysisCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

const detectMimeType = (base64) => {
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("iVBORw0KGgo")) return "image/png";
  if (base64.startsWith("R0lGOD")) return "image/gif";
  if (base64.startsWith("UklGR")) return "image/webp";
  return "image/jpeg"; // Default fallback
};

const XrayDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { xrayId, patientId: paramsPatientId } = useParams();
  const { id: statePatientId } = useSelector((state) => state.auth.user);
  const isDoctor = useSelector((state) => state.auth.userType === "doctor");
  const { xray, loading } = useSelector((state) => state.patient);
  const { pathname } = useLocation();

  const patientId = isDoctor ? paramsPatientId : statePatientId;

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]);

  useEffect(() => {
    dispatch(fetchPatientXray(patientId, xrayId));
  }, [dispatch, patientId, xrayId]);

  const handleBack = () => {
    setPatientXray(null);
    navigate(-1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4">X-Ray Analysis</Typography>
        </Box>
        <StatusChip result={xray?.status} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <XrayCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Original X-ray
              </Typography>
            </CardContent>
            <ImageContainer>
              <XrayImage
                src={`data:${detectMimeType(
                  xray?.original_image || ""
                )};base64,${xray?.original_image || ""}`}
                alt="Original X-ray"
              />
            </ImageContainer>
          </XrayCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <XrayCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enhanced X-ray
              </Typography>
            </CardContent>
            <ImageContainer>
              <XrayImage
                src={`data:${detectMimeType(
                  xray?.labeled_image || ""
                )};base64,${xray?.labeled_image || ""}`}
                alt="Labeled X-ray"
              />
            </ImageContainer>
          </XrayCard>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <AnalysisCard>
          <CardContent>
            {isDoctor ? (
              <DoctorAnalysis analysis={xray?.doctor_analysis} />
            ) : (
              <PatientAnalysis analysis={xray?.patient_analysis} />
            )}
          </CardContent>
        </AnalysisCard>
      </Grid>
    </PageContainer>
  );
};

export default XrayDetails;

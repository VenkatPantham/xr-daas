import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from "@mui/lab";
import {
  ArrowBack,
  Person,
  Email,
  Phone,
  CalendarToday,
  Assignment,
  // Event,
  MedicalInformation,
  LocalHospital,
  Notifications,
  // CalendarMonth,
  CloudUpload,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import StatusChip from "./StatusChip";
import { PageContainer } from "../../styles/components";
import UploadXray from "../patient/UploadXray";

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  height: "100%",
  backgroundColor: theme.palette.background.default,
  "& .stat-title": {
    fontSize: "0.875rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "& .stat-value": {
    fontSize: "1.25rem",
    fontWeight: 500,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.125rem",
    },
  },
}));

const TimelineCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    width: "100%",
  },
}));

// const RecommendationBox = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   backgroundColor: theme.palette.background.default,
//   borderRadius: theme.shape.borderRadius,
//   display: "flex",
//   gap: theme.spacing(2),
//   alignItems: "flex-start",
//   [theme.breakpoints.down("sm")]: {
//     padding: theme.spacing(1.5),
//   },
// }));

const PatientDetails = ({
  isDoctor = false,
  patientData,
  onBackClick,
  onXrayClick,
  onUploadSuccess,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const latestRecord = patientData?.medical_records?.[0];

  return (
    <PageContainer>
      {/* Header */}
      <Box
        sx={{
          mb: { xs: 2, sm: 4 },
          display: "flex",
          alignItems: "center",
          px: { xs: 1, sm: 0 },
        }}
      >
        {isDoctor && (
          <IconButton onClick={onBackClick} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant={isMobile ? "h5" : "h4"} component="span">
          {isDoctor ? "Patient Details" : "Patient Dashboard"}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Section - Patient Info */}
        <Grid item xs={12} md={4}>
          <InfoCard>
            <CardContent sx={{ textAlign: "center", position: "relative" }}>
              <LargeAvatar>
                <Person sx={{ fontSize: { xs: 30, sm: 40 } }} />
              </LargeAvatar>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ mt: 2, mb: 1 }}
              >
                {patientData?.name}
              </Typography>
              <StatusChip
                result={latestRecord?.status || "No X-ray"}
                size={isMobile ? "small" : "medium"}
              />
              <Divider sx={{ my: 3 }} />

              {/* Basic Information */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="subtitle2" color="primary" align="left">
                  Basic Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    Age: {patientData?.age} years
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    Gender: {patientData?.gender}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    {patientData?.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    {patientData?.phone}
                  </Typography>
                </Box>
              </Box>

              {/* Medical Summary */}
              {/* <Divider sx={{ my: 3 }} /> */}
              {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="subtitle2" color="primary" align="left">
                  Medical Summary
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Assignment fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    Total Records: {patientData.medical_records?.length || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Event fontSize="small" color="action" />
                  <Typography variant="body2" align="left">
                    Last Visit:{" "}
                    {latestRecord
                      ? new Date(
                          latestRecord.date_uploaded
                        ).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Box>
              </Box> */}

              {/* Risk Factors */}
              {patientData?.risk_factors &&
                patientData?.risk_factors.length > 0 && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        align="left"
                      >
                        Risk Factors
                      </Typography>
                      {patientData?.risk_factors.map((risk, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MedicalInformation fontSize="small" color="action" />
                          <Typography variant="body2" align="left">
                            {risk}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
            </CardContent>
          </InfoCard>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={8}>
          {/* Quick Stats */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <CardContent sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Assignment color="primary" sx={{ fontSize: "1.25rem" }} />
                    <Typography className="stat-title">Total X-rays</Typography>
                  </Box>
                  <Typography className="stat-value">
                    {patientData?.medical_records?.length || 0}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <CardContent sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <LocalHospital
                      color="primary"
                      sx={{ fontSize: "1.25rem" }}
                    />
                    <Typography className="stat-title">Last Visit</Typography>
                  </Box>
                  <Typography className="stat-value">
                    {latestRecord
                      ? new Date(
                          latestRecord.date_uploaded
                        ).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatsCard>
                <CardContent sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Notifications
                      color="primary"
                      sx={{ fontSize: "1.25rem" }}
                    />
                    <Typography className="stat-title">Next Checkup</Typography>
                  </Box>
                  <Typography className="stat-value">
                    {patientData?.nextCheckup
                      ? new Date(patientData?.nextCheckup).toLocaleDateString()
                      : "Not Scheduled"}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>

          {/* Upload Section - Only show for patient portal */}
          {!isDoctor && (
            <Card
              sx={{
                mt: 3,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "none",
                bgcolor: "background.default",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <CloudUpload color="primary" />
                  <Typography variant="h6">Upload New X-ray</Typography>
                </Box>
                <UploadXray
                  onUploadSuccess={onUploadSuccess}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    p: 2,
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* X-ray Timeline */}
          <Card
            sx={{
              mt: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent X-ray History
              </Typography>
              <Timeline
                sx={{
                  p: { xs: 0, sm: 2 },
                  m: 0,
                  [`& .MuiTimelineItem-root`]: {
                    minHeight: "auto",
                    "&:before": {
                      display: "none",
                    },
                  },
                  [`& .MuiTimelineContent-root`]: {
                    px: { xs: 1, sm: 2 },
                    py: 1,
                  },
                  [`& .MuiTimelineSeparator-root`]: {
                    mx: { xs: 1, sm: 2 },
                    minWidth: "auto",
                  },
                }}
              >
                {patientData?.medical_records
                  ?.slice(0, 3)
                  .map((record, index) => (
                    <TimelineItem key={record.id}>
                      <TimelineSeparator>
                        <TimelineDot
                          color={
                            record.status === "Normal" ? "success" : "error"
                          }
                          sx={{
                            my: 0,
                            mx: 0,
                            width: { xs: 16, sm: 20 },
                            height: { xs: 16, sm: 20 },
                            p: 0,
                            boxShadow: "none",
                          }}
                        />
                        {index < 2 && (
                          <TimelineConnector
                            sx={{
                              minHeight: { xs: 20, sm: 30 },
                              width: 2,
                            }}
                          />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <TimelineCard
                          onClick={(e) => {
                            e.stopPropagation();
                            onXrayClick(record.xray_image_id);
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              justifyContent: "space-between",
                              alignItems: { xs: "flex-start", sm: "center" },
                              gap: { xs: 0.5, sm: 1 },
                              mb: 1,
                            }}
                          >
                            <Typography variant="subtitle2">
                              {new Date(
                                record.date_uploaded
                              ).toLocaleDateString()}
                            </Typography>
                            <StatusChip
                              result={record.status}
                              size="small"
                              sx={{
                                alignSelf: { xs: "flex-start", sm: "center" },
                              }}
                            />
                          </Box>
                          {/* <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                          >
                            Doctor: {record.doctor}
                          </Typography> */}
                          <Typography
                            variant="body2"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              lineHeight: 1.4,
                              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                            }}
                          >
                            {record.diagnosis}
                          </Typography>
                        </TimelineCard>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </CardContent>
          </Card>

          {/* Health Recommendations */}
          {/* <Card
            sx={{
              mt: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Recommendations
              </Typography>
              <Grid container spacing={2}>
                {patientData.recommendations?.map((rec, index) => (
                  <Grid item xs={12} key={index}>
                    <RecommendationBox>
                      <CalendarMonth color="primary" sx={{ mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          {rec.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rec.description}
                        </Typography>
                      </Box>
                    </RecommendationBox>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PatientDetails;

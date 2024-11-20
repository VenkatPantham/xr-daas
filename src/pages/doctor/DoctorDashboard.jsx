import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  useTheme,
  Chip,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PersonOutlined,
  TrendingUp,
  NotificationsNone,
  Search,
  FilterList,
  MedicalInformation,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../styles/components";
import { fetchPatients } from "../../redux/slices/doctorSlice";
import StatusChip from "../../components/common/StatusChip";

const StatsCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}20 100%)`,
    borderRadius: "50%",
    transform: "translate(30%, -30%)",
  },
}));

const PatientCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  width: 300,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const DoctorDashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { patients, loading } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth);

  // Separate states for temporary and applied filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    status: "all",
    gender: "all",
    ageRange: "all",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    gender: "all",
    ageRange: "all",
  });

  useEffect(() => {
    dispatch(fetchPatients(user.id));
  }, [dispatch, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery("");
    // Reset filters when changing tabs
    setTempFilters({
      status: "all",
      gender: "all",
      ageRange: "all",
    });
    setAppliedFilters({
      status: "all",
      gender: "all",
      ageRange: "all",
    });
  };

  const handlePatientClick = (patientId) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  // Filter handlers
  const handleFilterChange = (field, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setFilterDialogOpen(false);
  };

  const clearFilters = () => {
    const resetFilters = {
      status: "all",
      gender: "all",
      ageRange: "all",
    };
    setTempFilters(resetFilters);
    setAppliedFilters(resetFilters);
  };

  // Open dialog with current applied filters
  const handleOpenFilterDialog = () => {
    setTempFilters(appliedFilters);
    setFilterDialogOpen(true);
  };

  // Close dialog without applying filters
  const handleCloseFilterDialog = () => {
    setTempFilters(appliedFilters); // Reset to previously applied filters
    setFilterDialogOpen(false);
  };

  // Filter logic
  const filterPatients = (patientsToFilter) => {
    return patientsToFilter.filter((patient) => {
      // Search query filter (applied immediately)
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toString().includes(searchQuery);

      // Applied filters (only after clicking Apply)
      const matchesStatus =
        appliedFilters.status === "all" ||
        patient.latestXray?.status === appliedFilters.status;

      const matchesGender =
        appliedFilters.gender === "all" ||
        patient.gender === appliedFilters.gender;

      let matchesAge = true;
      if (appliedFilters.ageRange !== "all") {
        const age = patient.age;
        switch (appliedFilters.ageRange) {
          case "young":
            matchesAge = age < 35;
            break;
          case "middle":
            matchesAge = age >= 35 && age < 50;
            break;
          case "senior":
            matchesAge = age >= 50;
            break;
          default:
            matchesAge = true;
        }
      }

      return matchesSearch && matchesStatus && matchesGender && matchesAge;
    });
  };

  // Get filtered patients based on current tab and applied filters
  const getFilteredPatients = () => {
    let filteredPatients = [...patients];

    // First apply tab filters
    switch (tabValue) {
      case 1: // Abnormal Cases
        filteredPatients = filteredPatients.filter((patient) => {
          const latestRecord = patient.medicalHistory?.[0];
          return latestRecord?.xray?.result === "Abnormal";
        });
        break;

      case 2: // Pending Analysis
        filteredPatients = filteredPatients.filter((patient) => {
          const latestRecord = patient.medicalHistory?.[0];
          return latestRecord?.xray?.result === "Pending";
        });
        break;

      default: // Recent Cases (all)
        // Create a new array before sorting
        filteredPatients = [...filteredPatients].sort((a, b) => {
          const dateA = new Date(a.medicalHistory?.[0]?.date_uploaded || 0);
          const dateB = new Date(b.medicalHistory?.[0]?.date_uploaded || 0);
          return dateB - dateA;
        });
        break;
    }

    // Then apply search and additional filters
    return filterPatients(filteredPatients);
  };

  const displayedPatients = getFilteredPatients();
  const stats = {
    totalPatients: patients.length,
    abnormalCases: patients.filter((p) => p.status === "Abnormal").length,
    pendingAnalysis: patients.filter((p) => p.status === "Pending").length,
  };

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
        <Typography variant="h4">Doctor Dashboard</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <SearchTextField
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={handleOpenFilterDialog}
            sx={{ textTransform: "none" }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <PersonOutlined color="primary" />
                <Typography variant="h6">Total Patients</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {stats.totalPatients}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Under your care
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <MedicalInformation color="error" />
                <Typography variant="h6">Abnormal Cases</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {stats.abnormalCases}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require attention
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <TrendingUp color="primary" />
                <Typography variant="h6">Pending Analysis</Typography>
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {stats.pendingAnalysis}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Awaiting review
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Recent Cases" />
              <Tab label="Abnormal Cases" />
              <Tab label="Pending Analysis" />
            </Tabs>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {displayedPatients.map((patient) => (
          <Grid item xs={12} md={6} lg={4} key={patient.id}>
            <PatientCard onClick={() => handlePatientClick(patient.id)}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">{patient.name}</Typography>
                  <StatusChip result={patient.status} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Age: {patient.age}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gender: {patient.gender}
                </Typography>
                {patient.latestXray && (
                  <Typography variant="body2" color="text.secondary">
                    Last X-ray:{" "}
                    {new Date(patient.latestXray.date).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
            </PatientCard>
          </Grid>
        ))}
        {displayedPatients.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No patients match the current filters
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Filter Dialog */}
      <Dialog
        open={filterDialogOpen}
        onClose={handleCloseFilterDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Filter Patients
            <IconButton onClick={handleCloseFilterDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={tempFilters.status}
                label="Status"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Abnormal">Abnormal</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={tempFilters.gender}
                label="Gender"
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              >
                <MenuItem value="all">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Age Range</InputLabel>
              <Select
                value={tempFilters.ageRange}
                label="Age Range"
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              >
                <MenuItem value="all">All Ages</MenuItem>
                <MenuItem value="young">Under 35</MenuItem>
                <MenuItem value="middle">35-50</MenuItem>
                <MenuItem value="senior">Over 50</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFilters} color="inherit">
            Clear Filters
          </Button>
          <Button onClick={handleApplyFilters} variant="contained">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default DoctorDashboard;

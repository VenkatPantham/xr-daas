import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import {
  Visibility,
  VisibilityOff,
  PersonOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(2),
  "& .MuiToggleButtonGroup-grouped": {
    margin: 0,
    flex: 1,
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const RoleToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const RoleIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    fontSize: 24,
    color: theme.palette.text.secondary,
  },
}));

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRoleChange = (_, newRole) => {
    if (newRole !== null) {
      setFormData({
        ...formData,
        userType: newRole,
      });
      setError("");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userType) {
      setError("Please select a role");
      return;
    }
    try {
      await dispatch(loginUser(formData)).unwrap();
      const path =
        formData.userType === "doctor"
          ? "/doctor/dashboard"
          : "/patient/dashboard";
      navigate(path);
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <StyledToggleButtonGroup
            value={formData.userType}
            exclusive
            onChange={handleRoleChange}
            aria-label="user role"
            fullWidth
          >
            <RoleToggleButton value="doctor" aria-label="doctor">
              <RoleIcon>
                <LocalHospitalOutlined />
                <Typography variant="body2">Doctor</Typography>
              </RoleIcon>
            </RoleToggleButton>
            <RoleToggleButton value="patient" aria-label="patient">
              <RoleIcon>
                <PersonOutlined />
                <Typography variant="body2">Patient</Typography>
              </RoleIcon>
            </RoleToggleButton>
          </StyledToggleButtonGroup>
        </Box>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          error={Boolean(error)}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          error={Boolean(error)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <SubmitButton type="submit" variant="contained" fullWidth size="large">
          Sign In
        </SubmitButton>

        {/* <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Demo Credentials
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              "& > *": {
                fontSize: "0.875rem",
                color: "text.secondary",
                textAlign: "center",
              },
            }}
          >
            <Typography>Doctor: doctor@example.com / password</Typography>
            <Typography>Patient: patient@example.com / password</Typography>
          </Box>
        </Box> */}
      </Form>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;

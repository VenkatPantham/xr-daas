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
import ToastNotification from "../common/ToastNotification";

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
  const [toast, setToast] = useState({
    message: "",
    severity: "success",
    open: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setToast({ ...toast, message: "", open: false });
  };

  const handleRoleChange = (_, newRole) => {
    if (newRole !== null) {
      setFormData({
        ...formData,
        userType: newRole,
      });
      setToast({ ...toast, message: "", open: false });
    }
  };

  const closeToast = () => {
    setToast({ ...toast, message: "", open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userType) {
      setToast({
        message: "Please select a role",
        severity: "error",
        open: true,
      });
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
      setToast({
        message: err.message || "Invalid credentials",
        severity: "error",
        open: true,
      });
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
          error={Boolean(toast.message)}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          error={Boolean(toast.message)}
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
      </Form>
      <ToastNotification
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        closeToast={closeToast}
      />
    </>
  );
};

export default LoginForm;

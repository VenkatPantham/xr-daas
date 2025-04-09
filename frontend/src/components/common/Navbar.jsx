import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { logout } from "../../redux/slices/authSlice";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, userType, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="div"
          onClick={() => navigate(`/${userType}/dashboard`)}
          sx={{ cursor: "pointer" }}
        >
          X-Ray Portal
        </Typography>
        <UserInfo>
          {!isMobile && <Typography>Welcome, {user?.name}</Typography>}
          <Button
            color="inherit"
            onClick={handleLogout}
            size={isMobile ? "small" : "medium"}
          >
            Logout
          </Button>
        </UserInfo>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;

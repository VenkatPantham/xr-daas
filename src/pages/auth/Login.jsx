import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoginForm from "../../components/auth/LoginForm";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(3),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: 0,
  overflow: "hidden",
  width: "100%",
  maxWidth: 1000,
  display: "flex",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.contrastText,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}80 0%, ${theme.palette.primary.main}80 100%)`,
    zIndex: 1,
  },
}));

const WelcomeContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50%",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <LoginContainer maxWidth={false}>
      <LoginCard elevation={0}>
        <LeftSection>
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <IconWrapper sx={{ display: "inline-flex" }}>
                <MedicalInformationIcon color="primary" sx={{ fontSize: 40 }} />
              </IconWrapper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                X-Ray Analysis Portal
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                AI-powered chest X-ray analysis for better healthcare decisions
              </Typography>
            </Box>
            <LoginForm />
          </Box>
        </LeftSection>

        {!isMobile && (
          <RightSection>
            <WelcomeContent>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Intelligent
                <br />
                X-Ray
                <br />
                Analysis
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  opacity: 0.9,
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Advanced AI technology to detect chest X-ray abnormalities with
                detailed analysis for both doctors and patients
              </Typography>
            </WelcomeContent>
          </RightSection>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

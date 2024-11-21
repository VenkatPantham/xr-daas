// import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const SpinnerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
});

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <CircularProgress />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

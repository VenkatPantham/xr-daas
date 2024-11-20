import React from "react";
import { Alert, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "100%",
  margin: "0 auto",
}));

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <ErrorContainer>
      <Alert severity="error" variant="filled">
        {message}
      </Alert>
    </ErrorContainer>
  );
};

export default ErrorMessage;

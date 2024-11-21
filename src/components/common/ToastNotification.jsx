import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ToastNotification = ({ severity, message, closeToast }) => (
  <Snackbar
    open={Boolean(message)}
    autoHideDuration={5000}
    onClose={closeToast}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert
      onClose={closeToast}
      severity={severity}
      variant="filled"
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default ToastNotification;

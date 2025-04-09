import React from "react";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme, result }) => ({
  backgroundColor:
    result === "Abnormal"
      ? theme.palette.error.main + "15" // Using alpha for background
      : result === "Pending"
      ? theme.palette.warning.main + "15"
      : theme.palette.success.main + "15",
  color:
    result === "Abnormal"
      ? theme.palette.error.main
      : result === "Pending"
      ? theme.palette.warning.main
      : theme.palette.success.main,
  fontWeight: 600,
  border: `1px solid ${
    result === "Abnormal"
      ? theme.palette.error.main
      : result === "Pending"
      ? theme.palette.warning.main
      : theme.palette.success.main
  }`,
  "& .MuiChip-label": {
    padding: "0 12px",
  },
}));

const StatusChip = ({ result, size = "medium", ...props }) => {
  return (
    <StyledChip
      label={result || "No Status"}
      result={result}
      size={size}
      {...props}
    />
  );
};

export default StatusChip;

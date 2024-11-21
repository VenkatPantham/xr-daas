import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CalendarToday,
  LocalHospital,
  Healing,
  Description,
  MedicalServices,
  MedicalInformation,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RecordItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  "& + &": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  minHeight: 24,
}));

const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: 24,
  width: 24,
});

const XrayButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(-0.5),
  height: 24,
  width: 24,
  "&:hover": {
    backgroundColor: theme.palette.primary.light + "20",
  },
}));

const XrayContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: 24,
  width: "100%",
});

const XrayText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: "1.43",
  fontWeight: 500,
  marginLeft: theme.spacing(1.5),
  color: theme.palette.primary.main,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  textAlign: "center",
  gap: theme.spacing(2),
}));

const MedicalRecords = ({
  records = [],
  userType = "patient",
  title = "Medical Records",
  patientId,
}) => {
  if (!records.length) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <EmptyStateContainer>
            <MedicalInformation
              sx={{
                fontSize: 64,
                color: "text.secondary",
                opacity: 0.5,
              }}
            />
            <Box>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Medical Records Available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userType === "patient"
                  ? "You don't have any medical records yet. Your records will appear here once they are added by your healthcare provider."
                  : "This patient doesn't have any medical records yet. Records will appear here once they are added to the system."}
              </Typography>
            </Box>
          </EmptyStateContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {records.map((record) => (
          <RecordItem key={record.id}>
            <InfoRow>
              <IconWrapper>
                <CalendarToday color="primary" fontSize="small" />
              </IconWrapper>
              <Typography variant="subtitle2">
                {new Date(record.date).toLocaleDateString()}
              </Typography>
            </InfoRow>

            <InfoRow>
              <IconWrapper>
                <LocalHospital color="secondary" fontSize="small" />
              </IconWrapper>
              <Typography variant="body2">{record.doctor}</Typography>
            </InfoRow>

            <InfoRow>
              <IconWrapper>
                <Healing color="primary" fontSize="small" />
              </IconWrapper>
              <Typography variant="body2">{record.diagnosis}</Typography>
            </InfoRow>

            <InfoRow>
              <IconWrapper>
                <Description color="action" fontSize="small" />
              </IconWrapper>
              <Typography variant="body2">{record.prescription}</Typography>
            </InfoRow>

            {record.notes && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, ml: 4 }}
              >
                {record.notes}
              </Typography>
            )}
          </RecordItem>
        ))}
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;

import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import StatusChip from "../../components/common/StatusChip";
import { PageContainer } from "../../styles/components";

const ImageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const XrayImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
});

const XrayCard = styled(Card)(({ theme }) => ({
  height: "100%",
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

const AnalysisCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

const DoctorAnalysisView = ({ analysis }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Doctor's Analysis
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {analysis.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {section.title}
          </Typography>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Observations:
            </Typography>
            {section.observations.map((obs, idx) => (
              <Box key={idx} sx={{ ml: 2, mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  • {obs}
                </Typography>
              </Box>
            ))}

            <Typography variant="subtitle1" gutterBottom>
              Impression:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {section.impression}
            </Typography>
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

const PatientAnalysisView = ({ analysis }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Understanding Your X-Ray Results
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {analysis.map((finding, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {finding.title}
          </Typography>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              What It Means:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2, mb: 2 }}>
              {finding.explanation}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Next Steps:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {finding.nextSteps}
            </Typography>
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

const XrayDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDoctor = location.pathname.includes("/doctor/");

  const handleBack = () => {
    if (isDoctor) {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };

  // Example data - in real app, this would come from your state/API
  const doctorAnalysis = [
    {
      title: "1. Cardiomegaly",
      observations: [
        "Label 1: Enlarged cardiac silhouette within coordinates (x_min=691, y_min=1375) to (x_max=1653, y_max=1831).",
        "Label 4: Similar enlargement noted at coordinates (x_min=692, y_min=1375) to (x_max=1657, y_max=1799), indicating consistent findings across multiple observations.",
        "Label 5: Additional sign of cardiomegaly at coordinates (x_min=689, y_min=1313) to (x_max=1666, y_max=1763), supporting the previous findings.",
      ],
      impression:
        "Persistent and consistent cardiac enlargement, suggesting underlying conditions such as chronic hypertension or a cardiomyopathy. Further echocardiographic evaluation may be warranted to determine precise etiology and assess cardiac function.",
    },
    {
      title: "2. Pleural Effusion",
      observations: [
        "Label 2: Presence of pleural effusion with coordinates specified as (x_min=1/89, y_min=1/29) to (X_max=18/5, y_max=1992).",
      ],
      impression:
        "Mild to moderate pleural effusion, possibly secondary to congestive heart failure given concurrent cardiomegaly, though other etiologies (e.g., infection, malignancy) should be ruled out.",
    },
    {
      title: "3. Pleural Thickening",
      observations: [
        "Label 3: Noted at coordinates (x_min=1/89, y_min=1/29) to (X_max=18/5, y_max=1992), coinciding with the region of pleural effusion.",
      ],
      impression:
        "Likely chronic pleural reaction, potentially due to previous inflammatory processes. Correlation with clinical history and prior imaging could confirm whether this finding is stable or progressive.",
    },
    {
      title: "4. Aortic Enlargement",
      observations: [
        "Label 6: Enlarged aortic region with coordinates (x_min=1052, y_min=715) to (x_max=1299, y_max=966).",
      ],
      impression:
        "The enlargement in the aorta could indicate an aneurysmal change or vessel hypertrophy, often associated with chronic hypertension or age-related vascular degeneration. Recommend further imaging (CT angiography) if clinically indicated.",
    },
  ];

  const patientAnalysis = [
    {
      title: "Heart Size (Cardiomegaly)",
      explanation:
        "The X-ray shows that your heart appears slightly larger than normal. This is known as cardiomegaly and may suggest your heart is working harder than usual, possibly due to high blood pressure or other conditions.",
      nextSteps:
        "The doctor might suggest additional tests, like an ultrasound of your heart, to understand why it's enlarged and if any treatment is needed.",
    },
    {
      title: "Fluid in the Lungs (Pleural Effusion)",
      explanation:
        "There seems to be some extra fluid around your lungs. This could happen for various reasons, including heart issues (especially if the heart is enlarged) or infections.",
      nextSteps:
        "Your doctor will check to see if the fluid needs to be drained or if other tests are needed to understand its cause.",
    },
    {
      title: "Thickening Around the Lungs (Pleural Thickening)",
      explanation:
        "This thickening could be from old inflammation or irritation of the lung lining. If you had a lung infection or exposure to irritants in the past, this may be a sign of that.",
      nextSteps:
        "Typically, this is just watched over time, so your doctor may compare this with past images to see if it's changed.",
    },
    {
      title: "Slightly Enlarged Artery (Aortic Enlargement)",
      explanation:
        "The X-ray suggests that a major artery from your heart, called the aorta, might be slightly enlarged. This can happen with age or high blood pressure.",
      nextSteps:
        "Sometimes, doctors check this further with other types of scans to make sure the artery is safe and strong. Your doctor will let you know if any follow-up is needed here.",
    },
  ];

  // Example record - in real app, this would come from your state/API
  const record = {
    xray: {
      result: "Abnormal",
      originalImage: "/images/original.png",
      enhancedImage: "/images/enhanced.png",
    },
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4">X-Ray Analysis</Typography>
        </Box>
        <StatusChip result={record.xray.result} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <XrayCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Original X-ray
              </Typography>
            </CardContent>
            <ImageContainer>
              <XrayImage src={record.xray.originalImage} alt="Original X-ray" />
            </ImageContainer>
          </XrayCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <XrayCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enhanced X-ray
              </Typography>
            </CardContent>
            <ImageContainer>
              <XrayImage src={record.xray.enhancedImage} alt="Enhanced X-ray" />
            </ImageContainer>
          </XrayCard>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <AnalysisCard>
          <CardContent>
            {isDoctor ? (
              <DoctorAnalysisView analysis={doctorAnalysis} />
            ) : (
              <PatientAnalysisView analysis={patientAnalysis} />
            )}
          </CardContent>
        </AnalysisCard>
      </Grid>
    </PageContainer>
  );
};

export default XrayDetails;

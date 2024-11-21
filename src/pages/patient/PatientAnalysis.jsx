import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const PatientAnalysis = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  const hasFindings = analysis.findings && analysis.findings.length > 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Patient's Analysis
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Summary Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Summary
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Overview:</strong>{" "}
              {analysis.patient_friendly_explanation.summary}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Total Findings:</strong>{" "}
              {analysis.patient_friendly_explanation.total_findings}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
              {analysis.patient_friendly_explanation.important_note}
            </Typography>
          </Box>
        </Box>

        {/* Findings Section */}
        {hasFindings && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              Detailed Findings
            </Typography>
            {analysis.findings.map((finding, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  gutterBottom
                >
                  {finding.name}
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>What It Means:</strong> {finding.what_it_means}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>How It May Affect You:</strong>{" "}
                    {finding.how_it_may_affect_you}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Confidence:</strong> {finding.confidence}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>What to Do Next:</strong>
                  </Typography>
                  <ul>
                    {finding.what_to_do_next.map((step, stepIndex) => (
                      <li key={stepIndex}>
                        <Typography variant="body2">{step}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Next Steps Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Next Steps
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>General Advice:</strong>{" "}
              {analysis.next_steps.general_advice}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Doctor Consultation:</strong>{" "}
              {analysis.next_steps.doctor_consultation}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientAnalysis;

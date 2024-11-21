import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const DoctorAnalysis = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  const hasAbnormalities =
    analysis.abnormalities && analysis.abnormalities.length > 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Doctor's Analysis
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Summary Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Summary
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Observations:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {analysis.analysis_for_doctor.summary}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Total Abnormalities:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {analysis.analysis_for_doctor.total_abnormalities}
            </Typography>
          </Box>
        </Box>

        {/* Abnormalities Section */}
        {hasAbnormalities && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color="primary.main" gutterBottom>
              Detected Abnormalities
            </Typography>
            {analysis.abnormalities.map((abnormality, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  gutterBottom
                >
                  {abnormality.name}
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Description:</strong> {abnormality.description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Potential Causes:</strong>{" "}
                    {abnormality.potential_causes.join(", ")}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Confidence Score:</strong>{" "}
                    {abnormality.confidence_score} (
                    {abnormality.confidence_interpretation})
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Severity:</strong> {abnormality.severity}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Urgency:</strong> {abnormality.urgency}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Clinical Implications:</strong>{" "}
                    {abnormality.clinical_implications.join(", ")}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Recommendations:</strong>
                  </Typography>
                  <ul>
                    {abnormality.recommendations.map(
                      (recommendation, recIndex) => (
                        <li key={recIndex}>
                          <Typography variant="body2">
                            <strong>
                              {recommendation.test_or_imaging ||
                                recommendation.specialist_referral}
                              :
                            </strong>{" "}
                            {recommendation.reason}
                          </Typography>
                        </li>
                      )
                    )}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Overall Conclusions Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Overall Conclusions
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Diagnostic Confidence:</strong>{" "}
              {analysis.overall_conclusions.diagnostic_confidence}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Further Review Needed:</strong>{" "}
              {analysis.overall_conclusions.further_review_needed}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Follow-Up Actions:</strong>
            </Typography>
            <ul>
              {analysis.overall_conclusions.follow_up_actions.map(
                (action, index) => (
                  <li key={index}>
                    <Typography variant="body2">{action}</Typography>
                  </li>
                )
              )}
            </ul>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorAnalysis;

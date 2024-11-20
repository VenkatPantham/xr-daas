import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Alert,
  Typography,
  CircularProgress,
  Dialog,
  styled,
} from "@mui/material";
import { CloudUpload, Close as CloseIcon } from "@mui/icons-material";

// Create styled components
const HiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledPreviewImage = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: 8,
  cursor: "pointer",
});

const UploadXray = ({ onUploadSuccess, sx = {} }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setError("Please upload a valid image file (JPEG or PNG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should be less than 5MB");
        return;
      }
      setError(null);
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("xray", selectedFile);

      // Replace with your actual API endpoint
      const response = await fetch("/api/patient/upload-xray", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload X-ray");
      }

      const data = await response.json();
      onUploadSuccess(data);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ...sx }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 2,
        }}
      >
        {preview ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              position: "relative",
            }}
          >
            <StyledPreviewImage
              src={preview}
              alt="X-ray preview"
              onClick={() => setShowPreview(true)}
            />
            <IconButton
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
                setError(null);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{
              py: 3,
              border: "2px dashed",
              borderColor: "divider",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            Select X-ray Image
            <HiddenInput
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
            />
          </Button>
        )}

        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary">
          Supported formats: JPEG, PNG (max 5MB)
        </Typography>

        {selectedFile && (
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload X-ray"
            )}
          </Button>
        )}
      </Box>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setShowPreview(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={preview}
            alt="X-ray full preview"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default UploadXray;

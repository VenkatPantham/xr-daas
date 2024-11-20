import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { uploadXray } from "../../redux/slices/patientSlice";

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  transition: "border-color 0.2s",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const HiddenInput = styled("input")({
  display: "none",
});

const ImagePreview = styled("img")({
  maxWidth: "100%",
  maxHeight: "200px",
  objectFit: "contain",
  marginTop: "16px",
});

const ImageUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.patient);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await dispatch(uploadXray(selectedFile)).unwrap();
      setSelectedFile(null);
      setPreview(null);
      setSuccessMessage("X-ray uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  return (
    <>
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload X-ray
          </Typography>

          <Box sx={{ mt: 2 }}>
            <HiddenInput
              type="file"
              accept="image/*"
              id="xray-upload"
              onChange={handleFileSelect}
            />

            <label htmlFor="xray-upload">
              <UploadBox onDrop={handleDrop} onDragOver={handleDragOver}>
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="body1" gutterBottom>
                  Drag and drop your X-ray image here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to select a file
                </Typography>

                {preview && <ImagePreview src={preview} alt="Selected X-ray" />}
              </UploadBox>
            </label>

            {loading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {successMessage && (
              <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={successMessage}
              />
            )}

            {selectedFile && !loading && !error && (
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  Upload X-ray
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ImageUpload;

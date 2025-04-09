import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Dialog,
  styled,
} from "@mui/material";
import { CloudUpload, Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { uploadPatientXray } from "../../redux/slices/patientSlice";
import ToastNotification from "../common/ToastNotification";

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
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    severity: "success",
    open: false,
  });

  const [showPreview, setShowPreview] = useState(false);
  const { xrayLoading } = useSelector((state) => state.patient);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Check MIME type and file extension
      if (
        (!file.type || !validImageTypes.includes(file.type)) &&
        !["jpg", "jpeg", "png"].includes(fileExtension)
      ) {
        setToast({
          message: "Please upload a valid image file (JPEG or PNG)",
          severity: "error",
          open: true,
        });
        return;
      }

      // File size check
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          message: "File size should be less than 5MB",
          severity: "error",
          open: true,
        });
        return;
      }

      // If all checks pass
      setToast({ ...toast, message: "", open: false });
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    dispatch(uploadPatientXray(selectedFile))
      .then(() => {
        // Clear file and preview after successful upload
        setToast({
          message: "X-ray analysis completed",
          severity: "success",
          open: true,
        });
        setSelectedFile(null);
        setPreview(null);
      })
      .catch((error) => {
        setToast({
          message: error?.message || "Something went wrong",
          severity: "error",
          open: true,
        });
      });
  };

  const closeToast = () => {
    setToast({ ...toast, message: "", open: false });
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
              onClick={!xrayLoading ? () => setShowPreview(true) : null}
              sx={{
                cursor: xrayLoading ? "not-allowed" : "pointer",
                opacity: xrayLoading ? 0.7 : 1,
              }}
            />
            <IconButton
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
                setToast({ ...toast, message: "", open: false });
              }}
              disabled={xrayLoading}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                ...(xrayLoading && {
                  cursor: "not-allowed",
                  opacity: 0.5,
                }),
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

        <Typography variant="body2" color="text.secondary">
          Supported formats: JPEG, PNG (max 5MB)
        </Typography>

        {selectedFile && (
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={xrayLoading}
            fullWidth
          >
            {xrayLoading ? (
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
            disabled={xrayLoading}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              ...(xrayLoading && {
                cursor: "not-allowed",
                opacity: 0.5,
              }),
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
      <ToastNotification
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        closeToast={closeToast}
      />
    </Box>
  );
};

export default UploadXray;

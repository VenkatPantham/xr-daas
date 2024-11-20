import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Example of how the data should be structured
const mockPatientData = {
  id: "P123456",
  name: "John Smith",
  age: 45,
  gender: "Male",
  email: "john.smith@email.com",
  contact: "+1 234-567-8900",
  riskFactors: [
    // Added risk factors
    "Smoking History - 10 pack years",
    "Family History of Lung Disease",
    "Occupational Exposure to Asbestos",
    "Chronic Bronchitis",
  ],
  medicalHistory: [
    {
      id: 1,
      date: "2024-03-15",
      type: "Chest X-ray",
      doctor: "Dr. Sarah Wilson",
      diagnosis: "Annual Chest Examination",
      xray: {
        result: "Abnormal",
        findings: "Cardiomegaly with mild pleural effusion",
        recommendations:
          "Follow-up in 6 weeks, cardiology consultation recommended",
        originalImage: "/images/chest-xray.png",
        enhancedImage: "/images/chest-xray-enhanced.png",
      },
    },
    {
      id: 2,
      date: "2023-09-20",
      type: "Chest X-ray",
      doctor: "Dr. Sarah Wilson",
      diagnosis: "Follow-up Examination",
      xray: {
        result: "Normal",
        findings: "No significant abnormalities detected",
        recommendations: "Routine annual follow-up",
        originalImage: "/images/chest-xray.png",
        enhancedImage: "/images/chest-xray-enhanced.png",
      },
    },
  ],
  recommendations: [
    {
      title: "Regular Exercise",
      description:
        "Maintain a regular exercise routine of at least 30 minutes daily to improve cardiovascular health.",
    },
    {
      title: "Follow-up Appointment",
      description:
        "Schedule a follow-up chest X-ray in 6 weeks to monitor the progression.",
    },
    {
      title: "Medication Adherence",
      description:
        "Continue prescribed medications as directed. Report any side effects to your healthcare provider.",
    },
    {
      title: "Lifestyle Modifications",
      description:
        "Maintain a healthy diet and avoid smoking to support your respiratory health.",
    },
  ],
  nextCheckup: "2024-05-15",
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPatientData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setPatientData } = patientSlice.actions;

// Async thunk for fetching patient data
export const fetchPatientData = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    dispatch(setPatientData(mockPatientData));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Add new action
export const updatePatientData = (newData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // In production, this would be an API call
    // For now, we'll just update the state
    dispatch(
      setPatientData({
        ...mockPatientData,
        medicalHistory: [
          {
            id: Date.now(),
            date: new Date().toISOString(),
            type: "Chest X-ray",
            doctor: "Pending Review",
            diagnosis: "Pending Analysis",
            xray: {
              result: "Pending",
              findings: "Awaiting analysis",
              recommendations: "Pending doctor review",
              originalImage: newData.imageUrl,
              enhancedImage: null,
            },
          },
          ...mockPatientData.medicalHistory,
        ],
      })
    );
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default patientSlice.reducer;

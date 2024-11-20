import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  patients: [],
  selectedPatient: null,
};

// Example mock data
const mockPatients = [
  {
    id: "P123456",
    name: "John Smith",
    age: 45,
    gender: "Male",
    email: "john.smith@email.com",
    contact: "+1 234-567-8900",
    status: "Abnormal",
    riskFactors: [
      "Smoking History - 10 pack years",
      "Family History of Lung Disease",
      "Occupational Exposure to Asbestos",
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
          originalImage: "/images/original.png",
          enhancedImage: "/images/enhanced.png",
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
  },
  {
    id: "P123457",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    email: "emily.j@email.com",
    contact: "+1 234-567-8901",
    status: "Pending",
    riskFactors: ["Recent COVID-19 Infection", "Persistent Cough"],
    medicalHistory: [
      {
        id: 2,
        date: "2024-03-18",
        type: "Chest X-ray",
        doctor: "Dr. Michael Brown",
        diagnosis: "Post-COVID Assessment",
        xray: {
          result: "Pending",
          findings: "Analysis in progress",
          recommendations: "Awaiting radiologist review",
          originalImage: "/images/original.png",
          enhancedImage: "/images/enhanced.png",
        },
      },
    ],
  },
  {
    id: "P123458",
    name: "Robert Chen",
    age: 58,
    gender: "Male",
    email: "robert.c@email.com",
    contact: "+1 234-567-8902",
    status: "Abnormal",
    riskFactors: ["Hypertension", "History of Tuberculosis", "Diabetes Type 2"],
    medicalHistory: [
      {
        id: 3,
        date: "2024-03-17",
        type: "Chest X-ray",
        doctor: "Dr. Sarah Wilson",
        diagnosis: "Follow-up Examination",
        xray: {
          result: "Abnormal",
          findings:
            "Bilateral hilar lymphadenopathy, possible tuberculosis reactivation",
          recommendations: "Urgent infectious disease consultation required",
          originalImage: "/images/original.png",
          enhancedImage: "/images/enhanced.png",
        },
      },
    ],
  },
  {
    id: "P123459",
    name: "Maria Garcia",
    age: 41,
    gender: "Female",
    email: "maria.g@email.com",
    contact: "+1 234-567-8903",
    status: "Normal",
    riskFactors: ["Seasonal Allergies"],
    medicalHistory: [
      {
        id: 4,
        date: "2024-03-16",
        type: "Chest X-ray",
        doctor: "Dr. Michael Brown",
        diagnosis: "Routine Screening",
        xray: {
          result: "Normal",
          findings: "No significant abnormalities detected",
          recommendations: "Routine follow-up in one year",
          originalImage: "/images/original.png",
          enhancedImage: "/images/enhanced.png",
        },
      },
    ],
  },
  {
    id: "P123460",
    name: "David Wilson",
    age: 63,
    gender: "Male",
    email: "david.w@email.com",
    contact: "+1 234-567-8904",
    status: "Pending",
    riskFactors: ["COPD", "Former Smoker", "Occupational Exposure"],
    medicalHistory: [
      {
        id: 5,
        date: "2024-03-19",
        type: "Chest X-ray",
        doctor: "Dr. Sarah Wilson",
        diagnosis: "COPD Assessment",
        xray: {
          result: "Pending",
          findings: "Awaiting AI analysis and radiologist review",
          recommendations: "Results expected within 24 hours",
          originalImage: "/images/original.png",
          enhancedImage: "/images/enhanced.png",
        },
      },
    ],
  },
];

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },
});

export const { setLoading, setError, setPatients, setSelectedPatient } =
  doctorSlice.actions;

// Async thunk for fetching patients
export const fetchPatients = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    // In a real app, this would be an API call
    const token = getState().auth.token;

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/doctor/patients`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log({ response });
    dispatch(setPatients(response.data));

    // dispatch(setPatients(mockPatients));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Async thunk for fetching a single patient
export const fetchPatientById = (patientId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    // In a real app, this would be an API call
    const patients = getState().doctor.patients;

    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      dispatch(setSelectedPatient(patient));
    } else {
      dispatch(setError("Patient not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default doctorSlice.reducer;

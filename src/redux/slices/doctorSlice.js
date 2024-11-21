import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  patients: [],
  selectedPatient: null,
};

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
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setPatients, setSelectedPatient } =
  doctorSlice.actions;

export const fetchPatients = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
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
    dispatch(setPatients(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchPatientById = (patientId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const token = getState().auth.token;

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/doctor/patient/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(setSelectedPatient(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default doctorSlice.reducer;

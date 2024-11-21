import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchPatientData = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const token = getState().auth.token;

    const response = await axiosInstance.get(`/patient`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(setPatientData(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchPatientXray =
  (patientId, xrayId) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const token = getState().auth.token;
      const userType = getState().auth.userType;

      const response = await axiosInstance.get(
        `/${
          userType === "doctor" ? "doctor/patient" : "patient"
        }/${patientId}/xray/${xrayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setPatientXray(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export const uploadPatientXray = (file) => async (dispatch, getState) => {
  try {
    dispatch(setXrayLoading(true));
    const token = getState().auth.token;

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `/patient/xray/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(mergeXrayIntoPatientData(response.data));
    dispatch(setXrayLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

const initialState = {
  loading: false,
  error: null,
  data: null,
  xray: null,
  xrayLoading: false,
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
      state.xrayLoading = false;
    },
    setPatientData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPatientXray: (state, action) => {
      state.xray = action.payload;
      state.loading = false;
      state.error = null;
    },
    setXrayLoading: (state, action) => {
      state.xrayLoading = action.payload;
    },
    mergeXrayIntoPatientData: (state, action) => {
      const xrayRecord = action.payload;
      if (state.data) {
        state.data.medical_records = [
          xrayRecord,
          ...(state.data.medical_records || []),
        ];
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setPatientData,
  setPatientXray,
  setXrayLoading,
  mergeXrayIntoPatientData,
} = patientSlice.actions;

export default patientSlice.reducer;

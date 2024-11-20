export const ROUTES = {
  LOGIN: "/login",
  DOCTOR: {
    DASHBOARD: "/doctor/dashboard",
    PATIENT_DETAILS: "/doctor/patient/:id",
  },
  PATIENT: {
    DASHBOARD: "/patient/dashboard",
  },
};

export const USER_TYPES = {
  DOCTOR: "doctor",
  PATIENT: "patient",
};

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  DOCTOR: {
    PATIENTS: "/doctor/patients",
    PATIENT_DETAILS: "/doctor/patients/:id",
  },
  PATIENT: {
    RECORDS: "/patient/records",
    UPLOAD: "/patient/upload",
  },
};

export const STORAGE_KEYS = {
  AUTH: "auth",
  THEME: "theme",
};
